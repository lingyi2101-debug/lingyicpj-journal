import { mkdir, rm, copyFile, cp, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const out = join(root, "dist");
const files = ["index.html", "styles.css", "app.js"];
const categories = ["course-review", "design-research-fieldwork", "self-reflection"];
const imageNames = new Set(["085ZhNVaG2SDgXAe5PbCzNsiIw.png", "RYtodtihAt2Q5V73Ut8FdU6bvrw.jpeg"]);

function walk(obj) {
  if (!obj || typeof obj !== "object") return;
  if (typeof obj.src === "string" && obj.src.startsWith("/assets/")) imageNames.add(obj.src.split("/").pop());
  if (Array.isArray(obj.images)) {
    for (const src of obj.images) {
      if (typeof src === "string" && src.startsWith("/assets/")) imageNames.add(src.split("/").pop());
    }
  }
  if (Array.isArray(obj.children)) for (const child of obj.children) walk(child);
}

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "assets"), { recursive: true });
await mkdir(join(out, "data"), { recursive: true });

for (const file of files) await copyFile(join(root, file), join(out, file));
for (const category of categories) {
  const filename = category + ".json";
  const content = await readFile(join(root, "data", filename), "utf8");
  await writeFile(join(out, "data", filename), content);
  const data = JSON.parse(content);
  for (const page of data.pages ?? []) {
    for (const section of page.sections ?? []) walk(section);
  }
}

const names = [...imageNames];
let completed = 0;
let next = 0;
let failed = [];
const fetchFile = async (name) => {
  const url = "https://framerusercontent.com/images/" + encodeURIComponent(name);
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 25000);
      let response;
      try {
        response = await fetch(url, {
          signal: controller.signal,
          headers: { "User-Agent": "Mozilla/5.0" }
        });
      } finally { clearTimeout(id); }
      if (!response.ok) throw new Error("HTTP " + response.status);
      const buffer = Buffer.from(await response.arrayBuffer());
      const filename = name.replace(/\.(png|jpe?g|avif)$/i, ".webp");
      const optimized = await sharp(buffer)
        .rotate()
        .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 84, effort: 4 })
        .toBuffer();
      await writeFile(join(out, "assets", filename), optimized);
      completed++;
      if (completed % 10 === 0 || completed === names.length) {
        console.log("Restored " + completed + " / " + names.length + " CPJ photos.");
      }
      return;
    } catch (e) {
      lastError = e;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 800 * attempt));
    }
  }
  failed.push({ name, reason: lastError?.message || "Unknown error" });
};

await Promise.all(Array.from({ length: 5 }, async () => {
  while (next < names.length) {
    const index = next++;
    await fetchFile(names[index]);
  }
}));

if (failed.length) {
  console.error("Some Framer assets could not be mirrored:");
  for (const { name, reason } of failed) console.error(" -", name, reason);
  throw new Error("Image mirror incomplete: " + failed.length + " missing assets. Deployment stopped to prevent broken photos.");
}
console.log("CPJ website ready: " + categories.length + " journals, " + names.length + " images, " + out);
