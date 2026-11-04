/* ============================================================================
   Malachite Travel & Tours: shared behaviour for every page.
   Each feature only runs if its markup exists on the current page, so one file serves the whole site.
   Data (journeys, FAQ, galleries, contact settings) lives in js/data.js.
   ============================================================================ */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
const wa=t=>`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
const mail=(s,b)=>{const[to,...cc]=CONFIG.emails;return `mailto:${to}?${cc.length?'cc='+cc.join(',')+'&':''}subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`};
const plural=(n,a,b)=>`${n} ${n===1?a:b}`;
const params=new URLSearchParams(location.search);

/* ---------- photos: pick the right file size for each photo ---------- */
const phSrc=(slug,w)=>{const p=PH[slug];if(!p||p.legacy)return `images/${slug}.jpg`;return `images/${slug}-${p.w.find(x=>x>=w)||p.w[p.w.length-1]}.jpg`};
const phSet=slug=>{const p=PH[slug];return !p||p.legacy?'':p.w.map(w=>`images/${slug}-${w}.jpg ${w}w`).join(', ')};
const img=(slug,alt,sizes='(min-width:900px) 50vw, 100vw',x='')=>{const p=PH[slug]||{},set=phSet(slug);
 return `<img src="${phSrc(slug,1200)}" ${set?`srcset="${set}" sizes="${sizes}"`:''} alt="${alt}" ${p.r?`width="${p.r[0]}" height="${p.r[1]}"`:''} loading="lazy" decoding="async" ${x} onerror="imgFail(this)">`};

/* ---------- quote reference for lead attribution ---------- */
const AL='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let ref='',sent=false;
const newRef=()=>{ref=CONFIG.refPrefix+Array.from({length:5},()=>AL[Math.floor(Math.random()*AL.length)]).join('');sent=false};
newRef();

/* ---------- header + menu ---------- */
const hdr=$('#hdr'),mb=$('#menuBtn'),mn=$('#menu');
hdr.classList.toggle('sm',scrollY>40);addEventListener('scroll',()=>hdr.classList.toggle('sm',scrollY>40),{passive:true});
const menu=o=>{mn.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');mb.innerHTML=`<svg class="ic"><use href="#i-${o?'x':'menu'}"/></svg>`};
mb.onclick=()=>menu(!mn.classList.contains('open'));
mn.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
addEventListener('resize',()=>{if(innerWidth>=1180&&mn.classList.contains('open'))menu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&mn.classList.contains('open')){menu(false);mb.focus()}});

/* ---------- contact links (every page): WhatsApp and email buttons carry the quote reference ---------- */
const askMsg=t=>`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like to ask about ${t.topic}.\n\nPreferred dates or month:\nGroup size:\nInterests or special requests:\n\nPlease let me know what is possible. I understand that no rate is confirmed until you send me a proposal.`;
function contactLinks(){
 const q0=`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like help planning a trip.`;
 $$('[data-wa="general"]').forEach(a=>a.href=wa(q0));
 const gq=`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like a group or corporate proposal.\n\nEvent type:\nDates:\nGroup size:\nLocation:\n\nPlease advise on scope and pricing.`;
 $$('[data-wa="group"]').forEach(a=>a.href=wa(gq));
 $$('[data-em="group"]').forEach(a=>a.href=mail('Group proposal request ['+ref+']',gq));
 $$('[data-ask]').forEach(a=>{const t=TAILOR.find(x=>x.id===a.dataset.ask);if(t)a.href=a.dataset.ch==='wa'?wa(askMsg(t)):mail(`Inquiry [${ref}]: ${t.t}`,askMsg(t))});
}
contactLinks();

/* ---------- journeys (Trips & Experiences) ---------- */
const hasJourneys=!!$('#tabs');let cur='All';
if(hasJourneys){
 const cats=['All',...new Set(PK.map(p=>p.cat))];
 const tabs=()=>{$('#tabs').innerHTML=cats.map(c=>`<button class="tab" data-c="${c}" aria-pressed="${c===cur}">${c}</button>`).join('')};
 const rows=()=>{$('#pks').innerHTML=PK.filter(p=>cur==='All'||p.cat===cur).map(p=>`<article class="pk"><div class="pki">${img(p.img,p.alt,'(min-width:900px) 58vw, 100vw')}<span class="badge">${p.dur}</span></div><div><p class="cat">${p.cat}</p><h3>${p.title}</h3><ol class="route" aria-label="Route">${p.route.map(r=>`<li>${r}</li>`).join('')}</ol><p class="muted">${p.desc}</p><ul class="chips">${p.hl.map(h=>`<li>${h}</li>`).join('')}</ul><div class="acts"><button class="btn dark" data-open="${p.id}">Explore Itinerary</button><button class="btn ghost" data-plan="${p.id}">Plan This Trip</button></div></div></article>`).join('')};
 const show=()=>{tabs();rows()};
 $('#tabs').onclick=e=>{const b=e.target.closest('[data-c]');if(b){cur=b.dataset.c;show()}};
 if(params.get('filter')&&cats.includes(params.get('filter')))cur=params.get('filter');
 show();
 window.__setFilter=c=>{cur=c;show()};
}
/* filter links (any page): apply on the Trips page, otherwise go there */
document.addEventListener('click',e=>{const f=e.target.closest('[data-filter]');if(!f)return;
 if(hasJourneys){e.preventDefault();window.__setFilter(f.dataset.filter);$('#journeys').scrollIntoView()}
 else{e.preventDefault();location.href='trips.html?filter='+encodeURIComponent(f.dataset.filter)+'#journeys'}});

/* ---------- itinerary pop-up ---------- */
const md=$('#md');let openId='lz';
if(md){
 document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(!b)return;const p=PK.find(x=>x.id===b.dataset.open);openId=p.id;
  $('#mT').textContent=p.title;$('#mS').textContent=p.dur+' | '+p.route.join(', ');$('#mI').textContent=p.intro;
  $('#mH').innerHTML=p.hl.map(h=>`<li>${h}</li>`).join('');$('#mD').innerHTML=p.days.map((d,i)=>`<li><b>Day ${i+1}</b><br>${d}</li>`).join('');md.showModal();$('.mb').scrollTop=0});
 $('#mX').onclick=()=>md.close();md.addEventListener('click',e=>{if(e.target===md)md.close()});
 $('#mP').onclick=()=>{md.close();plan(openId)};
}

/* ---------- galleries + lightbox (one dialog, any number of galleries) ---------- */
const lb=$('#lb');let lbKey='home',li=0;
$$('[data-gallery]').forEach(el=>{const k=el.dataset.gallery,list=GAL[k]||[];
 el.innerHTML=list.map((g,i)=>{const p=PH[g[0]]||{};
  return `<button type="button" data-lb="${i}" aria-label="Enlarge photo: ${g[2]}"><img src="${phSrc(g[0],640)}" ${phSet(g[0])?`srcset="${phSet(g[0])}" sizes="(min-width:900px) 33vw, 50vw"`:''} alt="${g[1]}" ${p.r?`width="${p.r[0]}" height="${p.r[1]}"`:''} loading="lazy" decoding="async" onerror="imgFail(this)"><span>${g[2]}</span></button>`}).join('')});
if(lb){
 const showLb=i=>{const L=GAL[lbKey];li=(i+L.length)%L.length;const g=L[li];$('#lbI').style.visibility='';$('#lbI').src=phSrc(g[0],1200);$('#lbI').alt=g[1];$('#lbC').textContent=`${g[2]} (${li+1} of ${L.length})`};
 document.addEventListener('click',e=>{const b=e.target.closest('[data-lb]');if(!b)return;const box=b.closest('[data-gallery]');if(!box)return;lbKey=box.dataset.gallery;showLb(+b.dataset.lb);lb.showModal()});
 $('#lbP').onclick=()=>showLb(li-1);$('#lbN').onclick=()=>showLb(li+1);
 lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showLb(li-1);if(e.key==='ArrowRight')showLb(li+1)});
 $('#lbX').onclick=()=>lb.close();lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
}

/* ---------- tailor-made list + FAQ ---------- */
if($('#tailorList')){
 $('#tailorList').innerHTML=TAILOR.map(t=>`<li><b>${t.t}</b><p>${t.d}</p><div class="acts2"><a class="lnk dk" data-ask="${t.id}" data-ch="wa" target="_blank" rel="noopener">Ask on WhatsApp</a><a class="lnk dk" data-ask="${t.id}" data-ch="em">Email us</a></div></li>`).join('');
 contactLinks();
}
if($('#faqList')){
 $('#faqList').innerHTML=FAQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
 const ld=document.createElement('script');ld.type='application/ld+json';ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQ.map(f=>({'@type':'Question',name:f[0],acceptedAnswer:{'@type':'Answer',text:f[1]}}))});document.head.appendChild(ld);
}

/* ---------- plan a journey: go to the planner (this page or plan.html) ---------- */
const hasPlanner=!!$('#q');
function plan(id){
 if(!hasPlanner){location.href='plan.html?j='+encodeURIComponent(id)+'#planner';return}
 $('#jr').value=id;renderOpts();touch();$('#planner').scrollIntoView();
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-plan]');if(b){e.preventDefault();plan(b.dataset.plan)}
 const d=e.target.closest('[data-don]');if(d){e.preventDefault();
  if(!hasPlanner){location.href='plan.html?don='+encodeURIComponent(d.dataset.don)+'#planner';return}
  $(`input[name=don][value=${d.dataset.don}]`).checked=true;touch();$('#planner').scrollIntoView()}
 if(e.target.closest('a[href^="https://wa.me"],a[href^="mailto:"]'))sent=true;   // next change after a send gets a fresh reference
});

/* ---------- quote builder (plan.html). Prices stay hidden unless CONFIG.showPrices is true ---------- */
let renderOpts=()=>{},touch=()=>{};
if(hasPlanner){
 const noPrice=!CONFIG.showPrices;
 document.body.classList.toggle('noprice',noPrice);
 const jr=$('#jr'),FIELD={ad:'adults',ch:'children',nights:'nights'};
 jr.innerHTML='<option value="">Choose a journey</option>'+PK.map(p=>`<option value="${p.id}">${p.title} (${p.dur})</option>`).join('');
 $('#bg').innerHTML='<option value="">Prefer not to say</option>'+CONFIG.budgets.map(b=>`<option>${b}</option>`).join('');
 $('#dons').innerHTML=Object.entries(CONFIG.donations).map(([k,d])=>`<label class="opt"><input type="checkbox" name="don" value="${k}"><span><b>${d.label}</b><span>${noPrice?'Optional. Any amount is agreed with the team.':`Optional contribution of about ${money(d.amount)} (illustrative), to be discussed with the team.`}</span></span></label>`).join('');
 const checked=n=>$$(`input[name=${n}]:checked`).map(i=>i.value);
 renderOpts=function(){   // rebuilds stays and extras for the chosen journey; incompatible choices are dropped
  const c=CONFIG.packages[jr.value];$('#nightsBox').hidden=!(c&&c.perNight);
  if(!c){$('#stays').innerHTML='<p class="hint">Choose a journey to see the options that suit it.</p>';$('#extras').innerHTML='<p class="hint">Optional extras appear once you choose a journey.</p>';return}
  const prev=checked('stay')[0],keep=checked('ex'),st=c.stays.includes(prev)?prev:c.def;
  $('#stays').innerHTML=c.stays.map(k=>`<label class="opt"><input type="radio" name="stay" value="${k}" ${k===st?'checked':''}><span><b>${CONFIG.stays[k].label}</b><span>A preference only. Final accommodation is confirmed by Malachite.</span></span></label>`).join('');
  $('#extras').innerHTML=c.extras.map(k=>`<label class="opt"><input type="checkbox" name="ex" value="${k}" ${keep.includes(k)?'checked':''}><span><b>${CONFIG.extras[k].label}</b><span>${noPrice?'Optional extra, included in your proposal if chosen.':`Optional, about ${money(CONFIG.extras[k].rate)} per adult (illustrative).`}</span></span></label>`).join('');
 };
 function read(){
  const L=CONFIG.limits,errs=[],num=(id,name)=>{const el=$('#'+id),v=el.value.trim(),x=Number(v),r=L[FIELD[id]],ok=v!==''&&Number.isInteger(x)&&x>=r[0]&&x<=r[1];el.setAttribute('aria-invalid',!ok);if(!ok)errs.push(`${name} must be a whole number from ${r[0]} to ${r[1]}.`);return ok?x:null};
  const p=PK.find(x=>x.id===jr.value),c=p&&CONFIG.packages[p.id];
  const ad=num('ad','Adults'),ch=num('ch','Children'),ni=c&&c.perNight?num('nights','Nights'):1;
  const v=id=>$('#'+id).value.trim();
  return{p,c,ad,ch,ni,stay:checked('stay')[0],ex:checked('ex'),dn:checked('don'),err:errs,info:{dates:v('dt'),flex:$('#fx').checked,budget:v('bg'),name:v('nm'),contact:v('ct'),notes:v('nt')}};
 }
 function quote(s){      // price calculator: only used when CONFIG.showPrices is true
  const C=CONFIG,nights=s.c.perNight?s.ni:1,unit=Math.round(s.c.rate*C.stays[s.stay].factor)*nights,kid=Math.round(unit*C.childFactor),per=s.c.perNight?` (${plural(nights,'night','nights')})`:'';
  const lines=[{k:'Adults',txt:`${s.ad} × ${money(unit)}${per}`,amt:unit*s.ad}];
  if(s.ch)lines.push({k:'Children',txt:`${s.ch} × ${money(kid)}${per}`,amt:kid*s.ch});
  s.ex.forEach(k=>lines.push({k:C.extras[k].label,txt:`${plural(s.ad,'adult','adults')} × ${money(C.extras[k].rate)}`,amt:C.extras[k].rate*s.ad}));
  s.dn.forEach(k=>lines.push({k:C.donations[k].label+' (optional)',txt:'one-off contribution',amt:C.donations[k].amount}));
  return{lines,perAdult:unit+s.ex.reduce((t,k)=>t+C.extras[k].rate,0),total:lines.reduce((t,l)=>t+l.amt,0)};
 }
 function msgOf(s,q){
  const i=s.info,trav=plural(s.ad,'adult','adults')+(s.ch?`, ${plural(s.ch,'child','children')}`:''),dur=s.c.perNight?plural(s.ni,'night','nights'):s.p.dur;
  const ex=s.ex.map(k=>CONFIG.extras[k].label),dn=s.dn.map(k=>CONFIG.donations[k].label);
  const head=['Hello Malachite Travel & Tours,','',`I generated an inquiry on your website [Ref: ${ref}] for the ${s.p.title} for ${trav}. Please confirm availability.`,'',
   'Trip details',`Journey: ${s.p.title} (${dur})`,`Accommodation preference: ${CONFIG.stays[s.stay].label}`,`Travellers: ${trav}`,`Extras: ${ex.join(', ')||'None'}`,`Voluntary contribution: ${dn.length?dn.join(', ')+' (optional, to discuss; nothing has been paid)':'None'}`,'',
   'My plans',`Preferred dates or month: ${i.dates||'Not specified'}${i.flex?' (flexible)':''}`,`Approximate budget: ${i.budget||'Not specified'}`,`Special requests: ${i.notes||'None'}`,`Name: ${i.name||'Not given'}`,`Contact: ${i.contact||'Reply to this message'}`,''];
  const tail=q?['Provisional estimate (demonstration only)',...q.lines.map(l=>`- ${l.k}: ${l.txt} = ${money(l.amt)}`),`Per adult: about ${money(q.perAdult)}`,`Group total: about ${money(q.total)}`,'','I understand this estimate is provisional. Final pricing, availability and inclusions are to be confirmed by Malachite. Thank you.']
   :['I understand that no price has been quoted on the website. Please send me a proposal with pricing and availability. Thank you.'];
  return head.concat(tail).join('\n');
 }
 function update(){
  const s=read();$('#err').textContent=s.err.join(' ');
  contactLinks();
  const ok=!!s.p&&!s.err.length&&!!s.stay;$('#sumFull').hidden=!ok;$('#sumEmpty').hidden=ok;
  $('#emptyMsg').textContent=s.p?'Check your traveller details to see your summary.':(noPrice?'Choose a journey to see your trip summary.':'Choose a journey to see an illustrative estimate for your group.');
  if(!ok)return;
  const T=plural(s.ad,'adult','adults')+(s.ch?`, ${plural(s.ch,'child','children')}`:'');
  const rowsDl=[['Journey',s.p.title],['Duration',s.c.perNight?plural(s.ni,'night','nights'):s.p.dur],['Accommodation',CONFIG.stays[s.stay].label],['Travellers',T]];
  if(noPrice){
   if(s.ex.length)rowsDl.push(['Extras',s.ex.map(k=>CONFIG.extras[k].label).join(', ')]);
   if(s.dn.length)rowsDl.push(['Contribution',s.dn.map(k=>CONFIG.donations[k].label).join(', ')+' (optional)']);
  }
  $('#sumDl').innerHTML=rowsDl.map(x=>`<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join('');
  $('#refTxt').textContent=ref;
  let m,q=null;
  if(noPrice){m=msgOf(s,null)}
  else{q=quote(s);$('#bk').innerHTML=q.lines.map(l=>`<div><span>${l.k}<small>${l.txt}</small></span><b>${money(l.amt)}</b></div>`).join('');$('#pp').textContent=money(q.perAdult);$('#tot').textContent=money(q.total);$('#disc').textContent=CONFIG.disclaimer;m=msgOf(s,q)}
  $('#wa').href=wa(m);$('#em').href=mail('Itinerary request ['+ref+']: '+s.p.title,m);
 }
 touch=()=>{if(sent)newRef();update()};
 function clamp(el){const r=CONFIG.limits[FIELD[el.id]];let v=Math.round(Number(el.value));if(!Number.isFinite(v)||el.value.trim()==='')v=r[0];v=Math.min(r[1],Math.max(r[0],v));const ch=String(v)!==el.value.trim();el.value=v;return ch}
 const form=$('#q');
 form.addEventListener('input',touch);
 form.addEventListener('change',e=>{if(e.target===jr)renderOpts();const adj=FIELD[e.target.id]?clamp(e.target):false;touch();if(adj){const r=CONFIG.limits[FIELD[e.target.id]];$('#err').textContent=`Adjusted to the allowed range (${r[0]} to ${r[1]}).`}});
 document.addEventListener('click',e=>{
  const st=e.target.closest('[data-st]');if(st){const i=$('#'+st.dataset.st),r=CONFIG.limits[FIELD[i.id]];i.value=Math.min(r[1],Math.max(r[0],(Number(i.value)||r[0])+ +st.dataset.d));touch()}
  if(e.target.closest('[data-go]'))$('#est').scrollIntoView()});
 renderOpts();update();
 /* deep links from other pages: plan.html?j=<journey id>&don=<kids|vulture> */
 const j=params.get('j');if(j&&PK.some(p=>p.id===j)){jr.value=j;renderOpts();touch()}
 const dn=params.get('don');if(dn&&$(`input[name=don][value=${dn}]`)){$(`input[name=don][value=${dn}]`).checked=true;touch()}
}

/* ---------- mobile action bar hides over the planner and closing sections; scroll reveal ---------- */
const bar=$('#mbar'),vis=new Set();
if('IntersectionObserver'in window){
 if(bar){const o=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));bar.classList.toggle('off',vis.size>0)});$$('[data-nobar]').forEach(x=>o.observe(x))}
 const r=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');r.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(x=>r.observe(x));
 /* destinations: highlight the chapter in view */
 const sn=$$('.subnav a');
 if(sn.length){const m=new Map(sn.map(a=>[a.getAttribute('href').slice(1),a]));
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){sn.forEach(a=>a.classList.remove('on'));const a=m.get(e.target.id);if(a)a.classList.add('on')}}),{rootMargin:'-40% 0px -55% 0px'});
  m.forEach((a,id)=>{const el=document.getElementById(id);if(el)so.observe(el)})}
}else{$$('.rv').forEach(x=>x.classList.add('in'))}

/* ---------- travel journal: lists articles from journal/index.json (empty until articles are added) ---------- */
const jg=$('#jgrid');
if(jg){
 fetch('journal/index.json',{cache:'no-cache'}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(list=>{
  list=(Array.isArray(list)?list:[]).filter(a=>a&&a.title&&a.url);
  const empty=$('#jempty'),cats=$('#jcats');
  if(!list.length){if(empty)empty.hidden=false;return}
  if(empty)empty.hidden=true;
  jg.innerHTML=list.map(a=>`<a class="jcard rv in" href="${a.url}"><div class="im">${a.image?img(a.image,a.alt||'', '(min-width:800px) 33vw, 100vw'):''}</div><span class="cat">${a.category||''}</span><h3>${a.title}</h3><p>${a.summary||''}</p></a>`).join('');
 });
}

/* ---------- hero video (homepage): loads only when the device and connection suit it ---------- */
const v=$('#hv'),vb=$('#hvt'),hero=$('#top');
if(v){
 const c=navigator.connection||{},slow=/(^|-)2g$/.test(c.effectiveType||'');
 if(matchMedia('(prefers-reduced-motion:reduce)').matches||c.saveData||slow){v.remove();if(vb)vb.remove()}
 else{
  v.src=(matchMedia('(max-width:700px)').matches&&v.dataset.srcMobile)||v.dataset.src;
  v.addEventListener('playing',()=>v.classList.add('on'),{once:true});
  let user=false;const play=()=>{const p=v.play();if(p&&p.catch)p.catch(()=>{})};
  play();
  if(vb){vb.hidden=false;vb.addEventListener('click',()=>{user=!user;if(user)v.pause();else play();vb.setAttribute('aria-label',user?'Play background video':'Pause background video');vb.innerHTML=`<svg class="ic"><use href="#i-${user?'play':'pause'}"/></svg>`})}
  if('IntersectionObserver'in window&&hero)new IntersectionObserver(es=>{if(user)return;es[0].isIntersecting?play():v.pause()}).observe(hero);
 }
}
})();
