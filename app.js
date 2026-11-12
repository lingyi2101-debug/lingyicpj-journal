/* CPJ — original Framer journal rebuilt as a static responsive website */
(()=>{"use strict";
const APP=document.getElementById("app"),BASE=new URL(".",document.baseURI).pathname;
const CATS=[{slug:"course-review",title:"COURSE REVIEW",short:"CLASS",icon:"📚",color:"green",intro:"My weekly class notes, ideas and lessons."},{slug:"design-research-fieldwork",title:"DESIGN RESEARCH & FIELDWORK",short:"FIELDWORK",icon:"🗺️",color:"fieldwork",intro:"Research, ideas, sketches and work outside the classroom."},{slug:"self-reflection",title:"SELF REFLECTION",short:"REFLECTION",icon:"💭",color:"reflection",intro:"Thoughts that stayed with me after each week."}];
const PAGES=new Map(),GALLERIES=new Map();let gid=0;
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const internal=path=>BASE+String(path||"/").replace(/^\/+/,"");
const asset=path=>{if(!path)return "";let p=String(path).replace(/^\/+/,"");if(p.startsWith("assets/"))p=p.replace(/\.(png|jpe?g|avif)$/i,".webp");return BASE+p;};
const href=path=>!path?"#":/^https?:\/\//i.test(path)?path:path.startsWith("/")?internal(path):path;
function a(path,markup,cls=""){const ext=/^https?:\/\//i.test(path||"");return '<a href="'+esc(href(path))+'" class="'+esc(cls)+'"'+(ext?' target="_blank" rel="noopener noreferrer"':' data-nav')+'>'+markup+'</a>';}
function shell(html,title=""){document.title="CPJ — A Curious Designer's Journal"+(title?" · "+title:"");return '<div class="site-wrap"><header class="site-nav">'+a("/",'<span class="brand-icon">Z</span><span>LINGYI ZHANG’S CPJ</span>',"brand")+'<nav class="nav-links" aria-label="Main navigation">'+a("/cpj/about-me","ABOUT ME")+a("/cpj/contents","CONTENTS")+'</nav></header>'+html+'<footer class="site-footer"><strong>KEEP ASKING QUESTIONS.</strong><p>Made with curiosity and a little chaos. © 2026 Lingyi</p></footer></div>';}
const back=(to,label)=>a(to,"← "+esc(label),"back-pill");
const rainbow=s=>[...s].map(c=>c===" "?" ":'<span class="rainbow-letter">'+esc(c)+'</span>').join("");
function home(){
 const items=[
  ["/cpj/self-reflection/week-01","01 / 03 ✳","WHY DID I JOIN DSF?","Where my Human-Centred Design journey began — and the question I could not answer yet.","START WITH WEEK 01 ↗"],
  ["/cpj/self-reflection/week-08/presentation","02 / 03 ✳","MY IDEAL “MAGGIE’S” BLUEPRINT","The Feeling Garden: a four-season sensory space for people to explore beyond sight.","EXPLORE MY SPACE ↗"],
  ["/cpj/self-reflection/week-13","03 / 03 ✳","MY DESIGN ETHOS","My semester in 50 points: learning to work with people, finding my voice and why I believe design should have warmth.","READ WEEK 13 REFLECTION ↗"]
 ];
 const cards=items.map(([url,num,title,desc,cta])=>a(url,'<span class="num">'+esc(num)+'</span><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p><span>'+esc(cta)+'</span>',"quick-card")).join("");
 const cover='<main><section class="paper hero-paper"><div class="welcome-strip">W E L C O M E &nbsp; T O &nbsp; M Y</div>'
  +'<div class="ski-banner"><img src="'+asset("assets/085ZhNVaG2SDgXAe5PbCzNsiIw.png")+'" alt="Ski illustration in front of a snowy mountain" /></div>'
  +'<div class="hero-inside"><span class="hero-ornament o1">〰</span><span class="hero-ornament o2">〰</span><span class="hero-ornament o3">☆</span><span class="hero-ornament o4">✦</span><span class="hero-ornament o5">✶</span>'
  +'<h1 class="hero-title"><span class="line">'+rainbow("CREATIVE")+'</span><span class="line">'+rainbow("PROCESS")+'</span><span class="line">'+rainbow("JOURNAL")+'</span></h1>'
  +'<p class="hero-subtitle">Creative Process Journal ・ Little ideas, big questions & a bit of chaos.</p>'+a("/cpj/contents","NEXT PAGE &nbsp; →","button button-blue")+'</div>'
  +'<div class="hero-bottom">✳ &nbsp; MADE OF QUESTIONS, SKETCHES & SKI DREAMS &nbsp; ✳<small>SCROLL DOWN ↓ &nbsp; THERE’S MORE TO EXPLORE</small></div></section>'
  +'<section class="paper quick-panel"><div class="eyebrow">✳ &nbsp; DSF / QUICK ACCESS</div><h2>THREE QUESTIONS. ONE JOURNEY.</h2>'
  +'<p>A little shortcut to the questions behind my design journey. Pick one to explore. ✳</p><div class="quick-grid">'+cards+'</div></section></main>';
 return shell(cover,"Home");
}
function contents(){
 const items=[["/cpj/about-me","ABOUT ME","01 / MEET ME ↗"],["/cpj/course-review","COURSE REVIEW","02 / OPEN 13 WEEKS ↗"],["/cpj/design-research-fieldwork","DESIGN RESEARCH & FIELDWORK","03 / OPEN 13 WEEKS ↗"],["/cpj/self-reflection","SELF REFLECTION","04 / OPEN 13 WEEKS ↗"]];
 const tiles=items.map(([path,name,n])=>a(path,'<h2>'+esc(name)+'</h2><small>'+esc(n)+'</small>',"directory-tile")).join("");
 return shell('<main class="paper contents-paper"><div class="contents-heading"><span class="mini-script">TABLE OF</span><h1 class="contents-title">'+rainbow("CONTENTS")+'</h1></div><div class="directory-grid">'+tiles+'</div><div class="contents-decor"><div class="envelope"></div><div class="envelope-note">✦</div></div><span class="contents-spark s1">✦</span><span class="contents-spark s2">☆</span><span class="contents-spark s3">〰</span><span class="contents-spark s4">✦</span></main>',"Contents");
}
function about(){
 const body="Hi, I’m Lingyi — skier, idea collector, and professional cannot-sit-still person. I love weird ideas, new experiences, and having fun. Somehow, I’m also pretty lazy. I’m a CSIA-certified ski instructor, and my dream? To be a designer who also teaches skiing. Why choose one when I can do both?";
 const html='<main class="paper about-paper">'+back("/cpj/contents","BACK TO CONTENTS")+'<h1 class="page-title">ABOUT ME</h1><div class="about-content"><div class="polaroid"><img src="'+asset("assets/RYtodtihAt2Q5V73Ut8FdU6bvrw.jpeg")+'" alt="Lingyi’s skiing photo" loading="lazy" /><div class="caption">ME, WHEN THERE’S SNOW ♡</div></div><div class="about-text"><div class="eyebrow">01 / ABOUT MEEEE! ✳</div><h2>A DESIGNER WITH SNOW ON THE BRAIN.</h2><p>'+esc(body)+'</p><div class="stickers"><span class="sticker">SKIING</span><span class="sticker">WEIRD IDEAS</span><span class="sticker">REAL PEOPLE</span><span class="sticker">A LITTLE LAZY</span><span class="sticker">✦ CSIA-CERTIFIED SKI INSTRUCTOR</span></div></div></div><div class="outro-quote">“I want to make designs with warmth and feelings — and maybe teach skiing along the way.” ✳</div></main>';
 return shell(html,"About Me");
}
const cat=slug=>CATS.find(c=>c.slug===slug);
function indexPage(slug){
 const c=cat(slug);if(!c)return notFound();
 let cards="";for(let i=1;i<=13;i++){const wk=String(i).padStart(2,"0"),path="/cpj/"+slug+"/week-"+wk,yes=PAGES.has(path),caption=yes?(slug==="course-review"?"OPEN CLASS NOTES ↗":slug==="self-reflection"?"OPEN REFLECTION ↗":"OPEN FIELDWORK ↗"):(i===8&&slug==="course-review"?"BREAK WEEK":"COMING SOON"),label='<strong>WEEK '+wk+'</strong><small>'+caption+'</small>';cards+=yes?a(path,label,"week-link"):'<span class="week-link week-disabled">'+label+'</span>';}
 return shell('<main class="paper index-paper category-'+c.color+'">'+back("/cpj/contents","BACK TO CONTENTS")+'<h1 class="page-title index-heading '+c.color+'">'+esc(c.title)+'</h1><p class="page-subtitle">'+esc(c.intro)+'</p><h2 class="week-index-title">WEEK 01 — 13 &nbsp; ✳</h2><div class="week-grid">'+cards+'</div><div class="index-note">Choose a week to read the journal. '+(slug==="course-review"?"Week 08 was a break week.":"All 13 weeks are here.")+'</div></main>',c.title);
}
function collect(block,out){
 if(!block)return;
 if(block.type==="text"){if(block.text&&block.text.trim())out.text.push(block.text);return;}
 if(block.type==="gallery"){if(block.images?.length)out.media.push({kind:"gallery",images:block.images,name:block.name||"Journal photos"});return;}
 if(block.type==="group"){
  if(block.href){const sub={text:[],media:[],links:[]};(block.children||[]).forEach(c=>collect(c,sub));out.links.push({href:block.href,label:sub.text.join(" ").slice(0,120)||block.name||"VIEW MORE ↗"});return;}
  if(block.src)out.media.push({kind:"photo",src:block.src,name:block.name||"Journal photo"});
  (block.children||[]).forEach(c=>collect(c,out));
 }
}
const isHeading=t=>t.length<165&&(t.toUpperCase()===t||/^\s*0\d\s*\/\s*/.test(t)||/^\s*(FIELD NOTE|GUEST INTERVIEW|MY REFLECTION)/i.test(t));
const caption=s=>String(s||"Journal photo").replace(/REPLACE PHOTO HERE|REPLACE IMAGE HERE|FILL → IMAGE|FILL|–/gi,"").replace(/\s*\/\s*$/,"").trim().slice(0,98)||"Journal photo";
function photo(m){const src=asset(m.src),name=caption(m.name);return '<figure class="photo-card"><button type="button" data-photo-src="'+esc(src)+'" aria-label="Enlarge '+esc(name)+'"><img src="'+esc(src)+'" loading="lazy" alt="'+esc(name)+'"/></button><figcaption>'+esc(name)+'</figcaption></figure>';}
function flipGallery(g){
 const imgs=(g.images||[]).map(asset).filter(Boolean);if(!imgs.length)return "";
 const id="gallery-"+(++gid);GALLERIES.set(id,{images:imgs,index:0});
 return '<div class="flip-gallery" data-gallery-id="'+id+'"><button type="button" class="gallery-toggle" data-gallery-next="'+id+'" aria-label="Show next photo"><img src="'+esc(imgs[0])+'" alt="'+esc(g.name||"Journal photo")+'" loading="lazy" /></button><div class="gallery-meta"><span>✳ TAP PHOTO TO SWITCH</span><div class="gallery-controls"><button data-gallery-prev="'+id+'" aria-label="Previous photo">‹</button><span class="gallery-count">01 / '+String(imgs.length).padStart(2,"0")+'</span><button data-gallery-next="'+id+'" aria-label="Next photo">›</button></div></div></div>';
}
function section(block,index){
 const info={text:[],media:[],links:[]};collect(block,info);
 if(!info.text.length&&!info.media.length&&!info.links.length)return "";
 const first=info.text[0]||"",label=isHeading(first)?first:(block.name||"FIELD NOTES ✳"),bodyTexts=isHeading(first)?info.text.slice(1):info.text;
 const text=bodyTexts.map(t=>isHeading(t)&&t.length<95?'<h3 class="section-subtitle">'+esc(t)+'</h3>':'<p class="section-body">'+esc(t)+'</p>').join("");
 const links=info.links.map(l=>a(l.href,esc(l.label),"text-link")).join("");
 const pics=info.media.filter(m=>m.kind==="photo"),slides=info.media.filter(m=>m.kind==="gallery");
 const pict=pics.length?'<div class="photo-grid '+(pics.length===1?"one":pics.length===3?"three":pics.length===4?"four":"")+'">'+pics.map(photo).join("")+'</div>':"";
 const media=pict+slides.map(flipGallery).join(""),wide=pics.length>=3||slides.some(s=>s.images.length>=4),withMedia=!!media&&!wide,mediaFirst=/photos? left|photo column|image left/i.test(block.name||"");
 return '<section class="journal-section section-'+(index+1)+'"><div class="section-layout'+(withMedia?" with-media":"")+(mediaFirst?" media-first":"")+'"><div class="section-copy"><h2 class="section-label">'+esc(label)+'</h2>'+text+links+'</div>'+(media?'<div class="section-media'+(wide?" media-full":"")+'">'+media+'</div>':"")+'</div></section>';
}
function footer(week){
 const wk=String(week).padStart(2,"0");
 const links=CATS.map(c=>{const url="/cpj/"+c.slug+"/week-"+wk,inner='<i>'+c.icon+'</i><b>'+c.short+'</b>';return PAGES.has(url)?a(url,inner):'<span aria-disabled="true"><i>'+c.icon+'</i><b>SOON</b></span>';}).join("");
 return '<aside class="journal-footer"><strong>KEEP EXPLORING WEEK '+wk+' ✳</strong><p>Finished reading? Jump to another part of the same week.</p><nav class="journal-nav" aria-label="Navigate week '+wk+'">'+links+'</nav></aside>';
}
function journal(p){
 const category=p.path.split("/")[2]||"self-reflection",c=cat(category),wk=String(p.week).padStart(2,"0"),presentation=p.path.endsWith("/presentation");
 gid=0;GALLERIES.clear();
 const intro=(p.intro||"").trim();
 const html='<main class="paper journal-paper">'+back("/cpj/"+category,"BACK TO "+(c?.short||"JOURNAL"))+'<header class="journal-hero"><div class="eyebrow" style="color:'+(category==="design-research-fieldwork"?"#ef7a14":category==="course-review"?"#0ba577":"#294fe0")+'">WEEK '+wk+' / '+esc(c?.title||category)+(presentation?" / PRESENTATION":"")+'</div><h1 class="page-title">'+esc(p.title)+'</h1>'+(intro&&intro!==p.title?'<p class="page-subtitle">'+esc(intro)+'</p>':"")+'</header><div class="divider"></div>'+(p.sections||[]).map(section).join("")+footer(p.week)+'</main>';
 return shell(html,"Week "+wk+" — "+(c?.title||"Journal"));
}
function notFound(){return shell('<main class="error-card"><h1>That page wandered off the map. ✳</h1><p>Try the journal contents instead.</p>'+a("/cpj/contents","BACK TO CONTENTS →","button button-blue")+'</main>',"Page not found");}
function pathname(){
 const routed=new URLSearchParams(location.search).get("route");if(routed){history.replaceState(null,"",internal(routed));return routed;}
 let p=location.pathname;if(p.startsWith(BASE))p="/"+p.slice(BASE.length);if(p.length>1)p=p.replace(/\/+$/,"");return p||"/";
}
function render(){
 const path=pathname(),html=path==="/"?home():path==="/cpj/contents"?contents():path==="/cpj/about-me"?about():CATS.some(c=>path==="/cpj/"+c.slug)?indexPage(path.split("/")[2]):PAGES.has(path)?journal(PAGES.get(path)):notFound();
 APP.innerHTML=html;window.scrollTo({top:0,left:0,behavior:"instant"});
}
function navigate(url){const path=new URL(url,location.origin).pathname;if(path===location.pathname){window.scrollTo({top:0,behavior:"smooth"});return;}history.pushState({},"",path);render();}
document.addEventListener("click",e=>{
 const nav=e.target.closest("a[data-nav]");if(nav&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();navigate(nav.href);return;}
 const b=e.target.closest("[data-gallery-next],[data-gallery-prev]");
 if(b){const id=b.dataset.galleryNext||b.dataset.galleryPrev,g=GALLERIES.get(id);if(!g)return;g.index=(g.index+(b.dataset.galleryPrev?-1:1)+g.images.length)%g.images.length;const frame=document.querySelector('[data-gallery-id="'+id+'"]');if(frame){const img=frame.querySelector("img");if(img)img.src=g.images[g.index];const count=frame.querySelector(".gallery-count");if(count)count.textContent=String(g.index+1).padStart(2,"0")+" / "+String(g.images.length).padStart(2,"0");}return;}
 const p=e.target.closest("[data-photo-src]");if(p){const viewer=document.getElementById("lightbox"),img=viewer?.querySelector("img");if(viewer&&img){img.src=p.dataset.photoSrc;viewer.hidden=false;}return;}
 if(e.target.closest(".lightbox-close")||e.target.id==="lightbox"){document.getElementById("lightbox").hidden=true;}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.getElementById("lightbox").hidden=true;});
window.addEventListener("popstate",render);
Promise.all(CATS.map(c=>fetch(asset("data/"+c.slug+".json")).then(r=>{if(!r.ok)throw Error(r.status+" "+c.slug);return r.json();})))
 .then(jsons=>{jsons.forEach(j=>(j.pages||[]).forEach(p=>PAGES.set(p.path,p)));render();})
 .catch(err=>{console.error("Could not load journal data",err);APP.innerHTML='<div class="error-card"><h1>Journal data could not load.</h1><p>Try refreshing, or check that /data/ was uploaded with the website.</p><pre>'+esc(err.message)+'</pre></div>';});
})();