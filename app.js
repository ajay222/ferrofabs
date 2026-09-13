(() => {
'use strict';
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
const file=document.getElementById('file'),status=document.getElementById('status'),wrap=document.getElementById('stageWrap'),handlesEl=document.getElementById('handles');
const img=new Image(); let source=null, scale=1, doors=2, applied=false, finish=null, selectedDoor=0;
let doorFinishes=[]; const textureCache={};
let corners=[{x:.12,y:.14},{x:.88,y:.14},{x:.88,y:.86},{x:.12,y:.86}];
const finishes=['im101','im102','im103','im104','im111','im145','im146','im112','im114','im117','im142','im131','im147','im133','im115','im116','im129','im156','im105','im130','im106','im108','im154','im155','im118','im120','im139','im122','im121','im125','im153','im126','im127','im128','im151','im152','im143','im144','im141','im148','im149','im157','im138','im150','im132','im901','im902','im903','im904','im905','im906','im907','im908','im909','im910','im107','im109','im110','im113','im119','im123','im113b','im162','im163','im182','im183','im184','im192','im193','im194','im195','im801','im802','im600','im601','im602','im603','im604','im605','im606','im607','im608','im609','im610','im611','im612','im613','im614','im615','im616','im617','im618','im619','im620','im621','im622','im501','im502','im503','im504','im505','im506','im507','im508','im509','im510','im511','im512','im519','im520','im521','im513','im514','im515','im522','im523','im524','im516','im517','im518','im525','im526','im527','im528','im529','im530','im531','im532','im533','im534','im535','im536','im537','im538','im539','im546','im547','im548','im540','im541','im542','im549','im550','im551','im543','im544','im545','im552','im553'];
const names={im101:'IM101 Bright Silver',im102:'IM102 Metallic Silver',im103:'IM103 Champagne Silver',im104:'IM104 Metallic Grey',im111:'IM111 Champagne Gold',im145:'IM145 Light Metallic Bronze',im146:'IM146 Dark Metallic Bronze',im112:'IM112 Rich Gold',im114:'IM114 Magic Gold',im117:'IM117 Copper Metallic',im142:'IM142 Pearl Copper',im131:'IM131 Regal Red',im147:'IM147 Rose Metallic',im133:'IM133 Metallic Purple',im115:'IM115 Jade Green',im116:'IM116 Metallic Blue',im129:'IM129 Anti Copper',im156:'IM156 Silver Green',im105:'IM105 Diamond White',im130:'IM130 Milky White',im106:'IM106 Pure White',im108:'IM108 Ivory White',im154:'IM154 Desert Sand',im155:'IM155 Beige',im118:'IM118 Red',im120:'IM120 Lilac',im139:'IM139 Burgundy',im122:'IM122 Orange',im121:'IM121 Pure Yellow',im125:'IM125 Traffic Yellow',im153:'IM153 Barbie Pink',im126:'IM126 Royal Blue',im127:'IM127 Navy Blue',im128:'IM128 Samsung Blue',im151:'IM151 Nokia Blue',im152:'IM152 Indigo Blue',im143:'IM143 Fluorescent Green',im144:'IM144 Post Green',im141:'IM141 Oppo Green',im148:'IM148 Basil Green',im149:'IM149 Reliance Green',im157:'IM157 Rose Gold',im138:'IM138 Chocolate Brown',im150:'IM150 Deep Grey',im132:'IM132 Black',im901:'IM901 Sand',im902:'IM902 Sand',im903:'IM903 Sand',im904:'IM904 Sand',im905:'IM905 Sand',im906:'IM906 Sand',im907:'IM907 Sand',im908:'IM908 Sand',im909:'IM909 Sand',im910:'IM910 Sand',im107:'IM107 Glossy White',im109:'IM109 Glossy Orange',im110:'IM110 Glossy Blue',im113:'IM113 Glossy Ivory',im119:'IM119 Glossy Red',im123:'IM123 Glossy Black',im113b:'IM113B Glossy Ivory',im162:'IM162 Glossy Silver',im163:'IM163 Glossy Metallic Grey',im182:'IM182 Brush Silver',im183:'IM183 Brush Gold',im184:'IM184 Butler Steel',im192:'IM192 Silver Mirror',im193:'IM193 Copper Mirror',im194:'IM194 Gold Mirror',im195:'IM195 Rose Gold Mirror',im801:'IM801 Sparkle White',im802:'IM802 Sparkle Black',im600:'IM600 Silver Travertile',im601:'IM601 Emperador',im602:'IM602 Perlato',im603:'IM603 White Macaubas',im604:'IM604 Brown Fire',im605:'IM605 Pearl White',im606:'IM606 Pearl Black',im607:'IM607 Mountain Red',im608:'IM608 Dark Emperador',im609:'IM609 White Statuario',im610:'IM610 White Panther Marble',im611:'IM611 Beige Granite',im612:'IM612 Marble Dyna',im613:'IM613 Graphite Stone',im614:'IM614 Turkish Stone',im615:'IM615 Copper Stone',im616:'IM616 Moissisure Green',im617:'IM617 Lustrous Grey',im618:'IM618 Marinace',im619:'IM619 Black Marquina',im620:'IM620 Oxidised Red',im621:'IM621 Venezuela Stone',im622:'IM622 Noxian White',im501:'IM501 Rose Wood',im502:'IM502 Flume Walnut',im503:'IM503 California Walnut',im504:'IM504 Tineo',im505:'IM505 Ebony',im506:'IM506 American Wenge',im507:'IM507 Chestnut',im508:'IM508 Mahogany',im509:'IM509 Burma Teak',im510:'IM510 Sapeli',im511:'IM511 Palado',im512:'IM512 Black Ebony',im519:'IM519 English Oak',im520:'IM520 English Chestnut',im521:'IM521 Golden Oak',im513:'IM513 Natural Teak',im514:'IM514 Black Forest',im515:'IM515 German Teak',im522:'IM522 Nutmeg',im523:'IM523 American Mahogany',im524:'IM524 Elantra Brown',im516:'IM516 Farm Teak',im517:'IM517 Zebra Wood',im518:'IM518 Black Satin',im525:'IM525 Arizona Oak',im526:'IM526 Peach Wood',im527:'IM527 Rustic Wood',im528:'IM528 Dark Teak',im529:'IM529 Royal Teak',im530:'IM530 Safari Wood',im531:'IM531 American Walnut',im532:'IM532 Chocolate Zebrano',im533:'IM533 Classic Walnut',im534:'IM534 Nova Teak',im535:'IM535 Oak Pine',im536:'IM536 New Rose Wood',im537:'IM537 Volcanic Oak',im538:'IM538 Dark Oak',im539:'IM539 Golden Teak',im546:'IM546 Pear Wood',im547:'IM547 Kashmir Walnut',im548:'IM548 Hickory Brown',im540:'IM540 Midnight Oak',im541:'IM541 Genius Oak',im542:'IM542 American Cherry',im549:'IM549 Rustic Bark',im550:'IM550 Aaron Walnut',im551:'IM551 Teak Gold',im543:'IM543 Golden Campino',im544:'IM544 Novarano Pine',im545:'IM545 Bubinga Teak',im552:'IM552 Indonesian Teak',im553:'IM553 Sudan Teak'};

function setStatus(t){status.textContent=t}
const DEFAULT_CORNERS=[{x:.12,y:.14},{x:.88,y:.14},{x:.88,y:.86},{x:.12,y:.86}];
let dividers=[]; // each divider has independent top and bottom normalized points
function resetGeometry(){corners=DEFAULT_CORNERS.map(p=>({...p}));dividers=[];for(let i=1;i<doors;i++){const t=i/doors;dividers.push({top:{x:t,y:.14},bottom:{x:t,y:.86}})} doorFinishes=Array(doors).fill(null); selectedDoor=0; renderDoorTargets(); }
function loadSrc(src,label){const next=new Image();next.onload=()=>{source=next;resetGeometry();applied=false;finish=null;resize();setStatus(label||'Photo loaded — drag the corner and divider handles.');};next.onerror=()=>setStatus('Could not load that image.');next.src=src}
file.addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;if(!f.type.startsWith('image/'))return setStatus('Please choose JPG, PNG or WebP.');const r=new FileReader();r.onload=()=>loadSrc(r.result,'Photo loaded — adjust the opening and door dividers.');r.onerror=()=>setStatus('Could not read the selected photo.');r.readAsDataURL(f)});
document.getElementById('sample').onclick=()=>loadSrc('assets/sample.jpg','Sample loaded — adjust the opening and door dividers.');
document.getElementById('reset').onclick=()=>{if(!source)return;resetGeometry();applied=false;draw();renderHandles();setStatus('Opening and door dividers reset.')};
document.getElementById('center').onclick=()=>{if(!source)return;resize();setStatus('Image centered.')};
function resize(){if(!source)return;const maxW=Math.min(1100,Math.max(320,wrap.parentElement.clientWidth-20)),maxH=Math.max(360,window.innerHeight-205);scale=Math.min(maxW/source.naturalWidth,maxH/source.naturalHeight);cv.width=Math.round(source.naturalWidth*scale);cv.height=Math.round(source.naturalHeight*scale);draw();renderHandles()}
function point(p){return {x:p.x*cv.width,y:p.y*cv.height}}
function pts(){return corners.map(point)}
function poly(a,b,c,d){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.lineTo(d.x,d.y);ctx.closePath()}
function doorPolys(){const [a,b,c,d]=pts();const out=[];for(let i=0;i<doors;i++){const lt=i===0?a:point(dividers[i-1].top),rt=i===doors-1?b:point(dividers[i].top),rb=i===doors-1?c:point(dividers[i].bottom),lb=i===0?d:point(dividers[i-1].bottom);out.push([lt,rt,rb,lb])}return out}
function draw(){if(!source)return;ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(source,0,0,cv.width,cv.height);if(applied&&doorFinishes.some(Boolean))renderFinish();else {ctx.save();poly(...pts());ctx.strokeStyle='#35d28b';ctx.lineWidth=3;ctx.stroke();ctx.restore();drawGuides()}}
function drawGuides(){doorPolys().forEach((p,i)=>{ctx.save();poly(...p);ctx.strokeStyle='rgba(53,210,139,.8)';ctx.lineWidth=2;ctx.stroke();ctx.restore()});}
function makeTexture(id,cb){
  if(textureCache[id]) return cb(textureCache[id]);
  const img2=new Image();
  img2.onload=()=>{
    const pad=Math.max(6,Math.round(Math.min(img2.naturalWidth,img2.naturalHeight)*0.08));
    const tw=Math.max(1,img2.naturalWidth-pad*2),th=Math.max(1,img2.naturalHeight-pad*2);
    const tex=document.createElement('canvas');tex.width=tw;tex.height=th;
    tex.getContext('2d').drawImage(img2,pad,pad,tw,th,0,0,tw,th);
    textureCache[id]=tex; cb(tex);
  };
  img2.src='assets/'+id+'.jpg';
}
function renderFinish(){
  const rot=+document.getElementById('rot').value;
  const opacity=+document.getElementById('opacity').value;
  const jobs=doorFinishes.map((id,i)=>new Promise(resolve=>{
    if(!id)return resolve();
    makeTexture(id,tex=>{
      const dp=doorPolys()[i]; ctx.save(); poly(...dp); ctx.clip(); ctx.globalAlpha=opacity;
      const pat=ctx.createPattern(tex,'repeat'); ctx.fillStyle=pat;
      if(rot===90){ctx.translate(cv.width/2,cv.height/2);ctx.rotate(Math.PI/2);ctx.translate(-cv.width/2,-cv.height/2)}
      ctx.fillRect(-cv.width,-cv.height,cv.width*3,cv.height*3); ctx.restore(); resolve();
    });
  }));
  Promise.all(jobs).then(()=>{
    ctx.save(); doorPolys().forEach(dp=>{poly(...dp);ctx.strokeStyle='rgba(0,0,0,.30)';ctx.lineWidth=1;ctx.stroke()}); ctx.restore();
    drawGuides();
  });
}
function renderHandles(){
  handlesEl.innerHTML='';
  corners.forEach((p,i)=>addHandle(p,'corner',i,'Corner '+(i+1)));
  dividers.forEach((v,i)=>{addHandle(v.top,'divider',i*2,'Door divider '+(i+1)+' top');addHandle(v.bottom,'divider',i*2+1,'Door divider '+(i+1)+' bottom')});
}
function addHandle(p,type,index,label){const h=document.createElement('div');h.className='handle '+type;h.style.left=(p.x*100)+'%';h.style.top=(p.y*100)+'%';h.dataset.type=type;h.dataset.i=index;h.title=label;h.setAttribute('aria-label',label);h.addEventListener('pointerdown',startDrag);handlesEl.appendChild(h)}
let drag=null;
function startDrag(e){if(!source)return;e.preventDefault();e.stopPropagation();const el=e.currentTarget;const type=el.dataset.type,index=+el.dataset.i;el.setPointerCapture?.(e.pointerId);drag={type,index};window.addEventListener('pointermove',moveDrag);window.addEventListener('pointerup',endDrag,{once:true});}
function moveDrag(e){if(!drag)return;const r=cv.getBoundingClientRect();let x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;x=Math.max(.005,Math.min(.995,x));y=Math.max(.005,Math.min(.995,y));
  if(drag.type==='corner') corners[drag.index]={x,y};
  else {const di=Math.floor(drag.index/2), side=drag.index%2?'bottom':'top';dividers[di][side]={x,y};}
  applied=false;draw();renderHandles();
}
function endDrag(){drag=null;window.removeEventListener('pointermove',moveDrag)}
function renderDoorTargets(){const el=document.getElementById('doorTargets');if(!el)return;el.innerHTML='';for(let i=0;i<doors;i++){const b=document.createElement('button');b.textContent='Door '+(i+1)+(doorFinishes[i]?' ✓':'');b.className=i===selectedDoor?'on':'';b.onclick=()=>{selectedDoor=i;renderDoorTargets();setStatus('Door '+(i+1)+' selected. Choose a finish and apply it to this door.');};el.appendChild(b)}}
function setDoorCount(n){doors=n;while(dividers.length<doors-1){const i=dividers.length+1,t=i/doors;dividers.push({top:{x:t,y:.14},bottom:{x:t,y:.86}})}dividers=dividers.slice(0,doors-1);while(doorFinishes.length<doors)doorFinishes.push(null);doorFinishes=doorFinishes.slice(0,doors);selectedDoor=Math.min(selectedDoor,doors-1);document.querySelectorAll('#doors button').forEach(x=>x.classList.toggle('on',+x.dataset.n===doors));applied=doorFinishes.some(Boolean);draw();renderHandles();renderDoorTargets();setStatus(doors===1?'1 door selected.':`${doors} doors selected — choose Door 1, Door 2, etc. to apply different finishes.`)}
document.querySelectorAll('#doors button').forEach(b=>b.onclick=()=>setDoorCount(+b.dataset.n));
document.getElementById('search').oninput=renderCatalog;
function renderCatalog(){const q=document.getElementById('search').value.toLowerCase();const el=document.getElementById('catalog');el.innerHTML='';finishes.filter(x=>(names[x]||x).toLowerCase().includes(q)).forEach(id=>{const d=document.createElement('div');d.className='swatch'+(finish===id?' on':'');d.innerHTML=`<img src="assets/${id}.jpg" alt="${names[id]||id}"><b>${names[id]||id}</b>`;d.onclick=()=>{finish=id;renderCatalog();setStatus((names[id]||id)+' selected. Click Apply finish to doors.');};el.appendChild(d)})}
document.getElementById('apply').onclick=()=>{if(!source)return setStatus('Choose a photo first.');if(!finish)return setStatus('Select a finish first.');doorFinishes[selectedDoor]=finish;applied=true;renderDoorTargets();draw();setStatus((names[finish]||finish)+' applied to Door '+(selectedDoor+1)+'.')};
document.getElementById('applyAll').onclick=()=>{if(!source)return setStatus('Choose a photo first.');if(!finish)return setStatus('Select a finish first.');doorFinishes=Array(doors).fill(finish);applied=true;renderDoorTargets();draw();setStatus((names[finish]||finish)+' applied to all '+doors+' doors.')};
document.getElementById('opacity').oninput=()=>{if(applied)draw()};document.getElementById('rot').onchange=()=>{if(applied)draw()};
document.getElementById('export').onclick=()=>{if(!source)return setStatus('Choose a photo first.');draw();cv.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='FerroFabs_preview.jpg';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/jpeg',.92)};
window.addEventListener('resize',()=>{if(source)resize()});
resetGeometry();renderCatalog();loadSrc('assets/sample.jpg','Sample loaded. Select a door count, then choose a door and finish.');
})();
