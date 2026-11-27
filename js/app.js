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
 const gq=`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like to ask about a group trip.\n\nDates:\nGroup size:\nDestination or package:\n\nPlease advise on what is possible.`;
 $$('[data-wa="group"]').forEach(a=>a.href=wa(gq));
 $$('[data-em="group"]').forEach(a=>a.href=mail('Group proposal request ['+ref+']',gq));
 const sq=`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like to ask how I can support The Smiling Children of Mala.\n\nI would like to help with (money, materials or not sure yet):\nMy name:\n\nPlease tell me how support is arranged and used.`;
 $$('[data-wa="support"]').forEach(a=>a.href=wa(sq));
 $$('[data-em="support"]').forEach(a=>a.href=mail('Supporting The Smiling Children of Mala ['+ref+']',sq));
 const mq=`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like to plan a meeting, incentive trip, conference or event.\n\nType of event:\nDates:\nNumber of people:\nPreferred destination:\n\nPlease advise on what is possible.`;
 $$('[data-wa="mice"]').forEach(a=>a.href=wa(mq));
 $$('[data-em="mice"]').forEach(a=>a.href=mail('MICE enquiry ['+ref+']',mq));
 const fq=`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like to discuss support for a film or video production.\n\nType of production:\nLocations in mind:\nDates:\nCrew size:\n\nPlease advise on what is possible.`;
 $$('[data-wa="film"]').forEach(a=>a.href=wa(fq));
 $$('[data-em="film"]').forEach(a=>a.href=mail('Filming enquiry ['+ref+']',fq));
 const dq=d=>`Hello Malachite Travel & Tours, I found you on your website [Ref: ${ref}] and would like help planning a trip to ${d}.\n\nPreferred dates or month:\nGroup size:\nInterests or special requests:\n\nPlease let me know what is possible.`;
 $$('[data-wadest]').forEach(a=>a.href=wa(dq(a.dataset.wadest)));
 $$('[data-ask]').forEach(a=>{const t=TAILOR.find(x=>x.id===a.dataset.ask);if(t)a.href=a.dataset.ch==='wa'?wa(askMsg(t)):mail(`Inquiry [${ref}]: ${t.t}`,askMsg(t))});
}
contactLinks();

/* ---------- packages page: filterable card grid. Published prices (PRICE in data.js) are shown per adult; everything else is "Request a Quote" ---------- */
const priceOf=id=>{const pr=typeof PRICE!=='undefined'&&PRICE[id];return pr&&pr.status==='published'&&CONFIG.showPublishedPrices?pr:null};
const catName=c=>c==='Kariba Houseboats'?'Lake Kariba houseboats':c==='Student Tours'?'Student and school tours':c;
const hasJourneys=!!$('#tabs');let cur='All';
if(hasJourneys){
 const cats=['All',...new Set(PK.map(p=>p.cat))];
 const tabs=()=>{$('#tabs').innerHTML=cats.map(c=>`<button class="tab" data-c="${c}" aria-pressed="${c===cur}">${c==='All'?'All packages':catName(c)}</button>`).join('')};
 const xs=[{id:'all',t:'Any experience'},...EXPERIENCES];let curX='all';
 /* the experience filter row was removed from the page (Round 12); an experience chosen on the homepage (?exp=) still narrows the list, with a 'Show all packages' button to clear it */
 const xtabs=()=>{if($('#xtabs'))$('#xtabs').innerHTML=xs.map(x=>`<button class="tab" data-x="${x.id}" aria-pressed="${x.id===curX}">${x.t}</button>`).join('')};
 const card=p=>{const pr=priceOf(p.id),cn=catName(p.cat),ch=p.cat==='Kariba Houseboats';
  return `<article class="pc${ch?' charter':''}" id="pk-${p.id}"><div class="pc-img${p.img?'':' nophoto'}">${p.img?img(p.img,p.alt,'(min-width:1040px) 33vw, (min-width:700px) 50vw, 100vw'):`<span>${cn}</span>`}<span class="badge">${p.dur}</span></div>`+
  `<div class="pc-b"><p class="cat">${cn}</p><h3>${p.title}</h3><ol class="route" aria-label="Route">${p.route.map(r=>`<li>${r}</li>`).join('')}</ol><p class="pc-d">${p.desc}</p><ul class="chips" aria-label="Main experiences">${p.hl.map(h=>`<li>${h}</li>`).join('')}</ul>`+
  `<div class="pc-price">${pr?`From <b>${money(pr.amt)}</b> ${pr.basis}`:`<b>Price on request</b><small>Send your dates and group size and we will quote.</small>`}</div>`+
  `<div class="acts"><button class="btn ghost" data-open="${p.id}" aria-label="View itinerary: ${p.title}">Itinerary</button><button class="btn gold" data-plan="${p.id}" aria-label="Request a quote: ${p.title}">Request a Quote</button></div></div></article>`};
 const inX=p=>curX==='all'||(xs.find(x=>x.id===curX).ids||[]).includes(p.id);
 const rows=()=>{const L=PK.filter(p=>(cur==='All'||p.cat===cur)&&inX(p)),A=L.filter(p=>p.cat!=='Kariba Houseboats'),H=L.filter(p=>p.cat==='Kariba Houseboats');
  $('#pks').innerHTML=A.map(card).join('');$('#pkhT').hidden=!A.length;$('#pks').hidden=!A.length;
  $('#pkh').innerHTML=H.map(card).join('');$('#charters').hidden=!H.length;$('#pkNone').hidden=!!L.length;
  const c=$('#pkcount');if(c){const xt=curX==='all'?'':' for '+xs.find(x=>x.id===curX).t.toLowerCase();c.textContent=!L.length?'':cur==='All'?(H.length?'Showing packages and Lake Kariba houseboat charters':'Showing packages')+xt+'.':(cur==='Kariba Houseboats'?'Showing Lake Kariba houseboat charters':'Showing packages in '+catName(cur))+xt+'.';if(curX!=='all'){const a=document.createElement('button');a.type='button';a.className='lnk dk pkall';a.textContent='Show all packages';c.append(' ',a)}}};
 const show=()=>{tabs();xtabs();rows()};
 $('#tabs').onclick=e=>{const b=e.target.closest('[data-c]');if(b){cur=b.dataset.c;curX='all';show();$('#tabs [aria-pressed=true]').focus()}};
 $('#pkcount').addEventListener('click',e=>{if(e.target.closest('.pkall')){curX='all';cur='All';show();$('#tabs [aria-pressed=true]').focus()}});
 if($('#xtabs'))$('#xtabs').onclick=e=>{const b=e.target.closest('[data-x]');if(b){curX=b.dataset.x;show();$('#xtabs [aria-pressed=true]').focus()}};
 if(xs.some(x=>x.id===params.get('exp')))curX=params.get('exp');
 if(params.get('filter')&&cats.includes(params.get('filter')))cur=params.get('filter');
 show();
 window.__setFilter=c=>{cur=c;show()};
 const hid=location.hash.match(/^#pk-([a-z]+)$/);   // deep link to one package, e.g. packages.html#pk-lz
 if(hid){const el=document.getElementById('pk-'+hid[1]);if(el){el.classList.add('hl');setTimeout(()=>el.scrollIntoView({block:'center'}),60)}}
}
/* filter links (any page): apply on the Packages page, otherwise go there */
document.addEventListener('click',e=>{const f=e.target.closest('[data-filter]');if(!f)return;
 if(hasJourneys){e.preventDefault();window.__setFilter(f.dataset.filter);$('#journeys').scrollIntoView()}
 else{e.preventDefault();location.href='packages.html?filter='+encodeURIComponent(f.dataset.filter)+'#journeys'}});

/* ---------- itinerary pop-up ---------- */
const md=$('#md');let openId='lz';
if(md){
 document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(!b)return;const p=PK.find(x=>x.id===b.dataset.open);openId=p.id;
  $('#mT').textContent=p.title;$('#mS').textContent=p.dur+' | '+p.route.join(', ');$('#mI').textContent=p.intro;
  $('#mH').innerHTML=p.hl.map(h=>`<li>${h}</li>`).join('');const steps=p.days?p.days.map((d,i)=>[`Day ${i+1}`,d]):(p.stops||[]);$('#mD').innerHTML=steps.map(x=>`<li><b>${x[0]}</b><br>${x[1]}</li>`).join('');md.showModal();$('.mb').scrollTop=0});
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
 if(!document.querySelector('script[data-faq]')){const ld=document.createElement('script');ld.type='application/ld+json';ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQ.map(f=>({'@type':'Question',name:f[0],acceptedAnswer:{'@type':'Answer',text:f[1]}}))});document.head.appendChild(ld)}
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
 jr.innerHTML='<option value="">Choose a journey</option>'+[...new Set(PK.map(p=>p.cat))].map(g=>`<optgroup label="${catName(g)}">${PK.filter(p=>p.cat===g).map(p=>`<option value="${p.id}">${p.title} (${p.dur})</option>`).join('')}</optgroup>`).join('');
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
  const pr=priceOf(s.p.id);
  const head=['Hello Malachite Travel & Tours,','',`I generated an inquiry on your website [Ref: ${ref}] for the ${s.p.title} for ${trav}. Please confirm availability.`,'',
   'Trip details',`Journey: ${s.p.title} (${dur})`,...(pr?[`Starting rate shown on your website: from ${money(pr.amt)} ${pr.basis} (not a confirmed quote)`]:[]),`Accommodation preference: ${CONFIG.stays[s.stay].label}`,`Travellers: ${trav}`,`Extras: ${ex.join(', ')||'None'}`,`Voluntary contribution: ${dn.length?dn.join(', ')+' (optional, to discuss; nothing has been paid)':'None'}`,'',
   'My plans',`Preferred dates or month: ${i.dates||'Not specified'}${i.flex?' (flexible)':''}`,`Approximate budget: ${i.budget||'Not specified'}`,`Special requests: ${i.notes||'None'}`,`Name: ${i.name||'Not given'}`,`Contact: ${i.contact||'Reply to this message'}`,''];
  const tail=q?['Provisional estimate (demonstration only)',...q.lines.map(l=>`- ${l.k}: ${l.txt} = ${money(l.amt)}`),`Per adult: about ${money(q.perAdult)}`,`Group total: about ${money(q.total)}`,'','I understand this estimate is provisional. Final pricing, availability and inclusions are to be confirmed by Malachite. Thank you.']
   :[pr?'I understand the starting rate on the website is not a confirmed quote. Please send me a proposal with pricing and availability for my dates. Thank you.':'I understand that no price has been quoted on the website. Please send me a proposal with pricing and availability. Thank you.'];
  return head.concat(tail).join('\n');
 }
 let lastMsg='';
 function steps(s){const f=n=>$(`#steps [data-s="${n}"]`);const i=s.info;f(1).classList.toggle('done',!!s.p);f(2).classList.toggle('done',!!s.p&&!!s.stay);f(3).classList.toggle('done',!s.err.length);f(4).classList.toggle('done',s.ex.length>0||s.dn.length>0);f(5).classList.toggle('done',!!(i.dates||i.name||i.contact||i.notes||i.budget));if(s.dn.length)$('#donBox').open=true}
 function update(){
  const s=read();steps(s);$('#err').textContent=s.err.join(' ');
  contactLinks();
  const ok=!!s.p&&!s.err.length&&!!s.stay;$('#sumFull').hidden=!ok;$('#sumEmpty').hidden=ok;
  $('#emptyMsg').textContent=s.p?'Check your traveller details to see your summary.':(noPrice?'Choose a journey to see your trip summary.':'Choose a journey to see an illustrative estimate for your group.');
  if(!ok)return;
  const T=plural(s.ad,'adult','adults')+(s.ch?`, ${plural(s.ch,'child','children')}`:'');
  const rowsDl=[['Journey',s.p.title],['Duration',s.c.perNight?plural(s.ni,'night','nights'):s.p.dur],['Accommodation',CONFIG.stays[s.stay].label],['Travellers',T]];
  const pr=priceOf(s.p.id);if(pr)rowsDl.splice(2,0,['Published starting rate','From '+money(pr.amt)+' '+pr.basis]);
  if(noPrice){
   if(s.ex.length)rowsDl.push(['Extras',s.ex.map(k=>CONFIG.extras[k].label).join(', ')]);
   if(s.dn.length)rowsDl.push(['Contribution',s.dn.map(k=>CONFIG.donations[k].label).join(', ')+' (optional)']);
  }
  $('#sumDl').innerHTML=rowsDl.map(x=>`<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join('');
  $('#refTxt').textContent=ref;
  let m,q=null;
  if(noPrice){m=msgOf(s,null)}
  else{q=quote(s);$('#bk').innerHTML=q.lines.map(l=>`<div><span>${l.k}<small>${l.txt}</small></span><b>${money(l.amt)}</b></div>`).join('');$('#pp').textContent=money(q.perAdult);$('#tot').textContent=money(q.total);$('#disc').textContent=CONFIG.disclaimer;m=msgOf(s,q)}
  $('#wa').href=wa(m);$('#em').href=mail('Itinerary request ['+ref+']: '+s.p.title,m);lastMsg=m;
 }
 touch=()=>{if(sent)newRef();update()};
 $('#cp').onclick=async()=>{const st=$('#cpS');try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(lastMsg);else{const t=document.createElement('textarea');t.value=lastMsg;t.setAttribute('readonly','');t.style.cssText='position:fixed;left:-999px';document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();if(!ok)throw 0}st.textContent='Summary copied. Paste it into WhatsApp, an email or a message to Malachite.';sent=true}catch(_){st.textContent='Copying is not available here. Please use the WhatsApp or email buttons instead.'}};
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

/* ---------- homepage quick enquiry: builds a ready-written WhatsApp / email message, nothing is sent until the visitor sends it ---------- */
const qi=$('#qi');
if(qi){
 qi.innerHTML='<option value="">Not sure yet, help me choose</option>'+[...new Set(PK.map(p=>p.cat))].map(g=>`<optgroup label="${catName(g)}">${PK.filter(p=>p.cat===g).map(p=>`<option value="${p.id}">${p.title} (${p.dur})</option>`).join('')}</optgroup>`).join('');
 const qUpd=()=>{const p=PK.find(x=>x.id===qi.value),n=$('#qn').value.trim(),m=$('#qm').value.trim(),t=Math.max(1,Math.min(60,Math.round(Number($('#qt').value))||1));
  const body=`Hello Malachite Travel & Tours,\n\nI found you on your website [Ref: ${ref}] and would like help planning a trip.\n\nInterested in: ${p?p.title+' ('+p.dur+')':'Not sure yet, please help me choose'}\nWhen: ${m||'Not decided yet'}\nTravellers: ${t}\nName: ${n||'Not given'}\n\nPlease let me know what is possible. I understand that no rate is confirmed until you send me a proposal.`;
  $('#qwa').href=wa(body);$('#qem').href=mail('Trip inquiry ['+ref+']',body)};
 $('#qe').addEventListener('input',()=>{if(sent)newRef();qUpd()});$('#qe').addEventListener('change',()=>{if(sent)newRef();qUpd()});qUpd();
}

/* ---------- team profiles: listed automatically once TEAM in data.js has entries ---------- */
const tmL=$('#teamList');
if(tmL&&typeof TEAM!=='undefined'&&TEAM.length){tmL.hidden=false;tmL.innerHTML=TEAM.map(m=>`<li>${m.img?img(m.img,m.alt||m.name,'(min-width:900px) 25vw, 50vw'):''}<b>${m.name}</b><small>${m.role}</small>${m.bio?`<p>${m.bio}</p>`:''}</li>`).join('')}

/* ---------- floating WhatsApp button: steps aside whenever a section would sit underneath it ----------
   Hidden while any contact section, the planner, the footer (or, on wide screens, the strip at the bottom of the homepage hero)
   overlaps the band of the screen where the button lives. Elsewhere it stays visible while scrolling. */
const bar=$('#wafab');
if(bar){
 const zones=[...$$('[data-nobar]'),...$$('footer')],hero=$('section.hero'),wide=matchMedia('(min-width:800px)'),zone=96;
 const hits=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>innerHeight-zone};
 let tk=0;
 const upd=()=>{tk=0;bar.classList.toggle('off',zones.some(hits)||(wide.matches&&!!hero&&hits(hero)))};
 const req=()=>{if(!tk)tk=requestAnimationFrame(upd)};
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);addEventListener('load',req);upd();
}
/* ---------- scroll reveal ---------- */
if('IntersectionObserver'in window){
 const r=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');r.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(x=>r.observe(x));
 /* destinations: highlight the chapter in view */
 const sn=$$('.subnav a');
 if(sn.length){const m=new Map(sn.map(a=>[a.getAttribute('href').slice(1),a]));
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){sn.forEach(a=>a.classList.remove('on'));const a=m.get(e.target.id);if(a)a.classList.add('on')}}),{rootMargin:'-40% 0px -55% 0px'});
  m.forEach((a,id)=>{const el=document.getElementById(id);if(el)so.observe(el)})
  addEventListener('scroll',()=>{if(scrollY<240)sn.forEach(a=>a.classList.remove('on'))},{passive:true})}
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

/* ---------- reviews: cards are written into the page by _tools/build.py from TESTIMONIALS in data.js.
   YouTube video reviews load only when the visitor presses play (faster pages, no YouTube cookies before then). ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('button[data-yt]');if(!b)return;const f=document.createElement('iframe');
 f.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(b.dataset.yt)+'?autoplay=1&rel=0';f.title=b.getAttribute('aria-label')||'Video review';
 f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.className='ytf';b.replaceWith(f)});

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
/* ---------- simple dialogs: a button with data-dlg="<dialog id>" opens it; [data-close] or a click outside closes it ---------- */
document.addEventListener('click',e=>{const o=e.target.closest('[data-dlg]');if(o){const d=document.getElementById(o.dataset.dlg);if(d&&d.showModal){d.showModal();d._from=o}return}
 const c=e.target.closest('dialog [data-close]');if(c){c.closest('dialog').close();return}
 if(e.target.matches&&e.target.matches('dialog.ocd'))e.target.close()});
$$('dialog.ocd').forEach(d=>d.addEventListener('close',()=>{if(d._from)d._from.focus()}));
})();
