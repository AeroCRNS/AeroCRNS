'use strict';
// Reference-based explanatory geometry; independent of the CTS decision engine.
try {
const $=id=>document.getElementById(id), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene=new THREE.Scene();scene.background=new THREE.Color('#edf0e8');
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,viewHeight());renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.72;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label','مجسم الحساس. اسحب أو استخدم الأسهم للتدوير، وعلامتي الجمع والطرح للتقريب.');document.body.prepend(canvas);
function viewHeight(){return Math.max(150,innerHeight-170);}
const camera=new THREE.PerspectiveCamera(35,innerWidth/viewHeight(),.02,100);
scene.add(new THREE.HemisphereLight(0xffffff,0x737967,.55));
function light(color,intensity,x,y,z){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l);return l;}
const key=light(0xfff4dd,1.4,-5,9,7);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-7,right:7,top:9,bottom:-6,near:.1,far:30});key.shadow.bias=-.0002;
light(0xd4e6ff,.7,5,5,-4);light(0xffffff,.3,2,3,8);
// Procedural studio reflections keep metal readable without remote assets.
const studio=new THREE.Scene();studio.background=new THREE.Color(0xadb7bb);
[[-5,2,0,2,12,12],[4,5,-3,4,7,3],[0,8,0,14,.2,14]].forEach(([x,y,z,w,h,d])=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:0xffffff}));b.position.set(x,y,z);studio.add(b);});
const dark=new THREE.Mesh(new THREE.BoxGeometry(10,9,.1),new THREE.MeshBasicMaterial({color:0x28343f}));dark.position.set(0,0,-7);studio.add(dark);
const pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.04);scene.environment=environment.texture;studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});pmrem.dispose();
const material=(color,metalness=0,roughness=.5,opacity=1)=>new THREE.MeshStandardMaterial({color:new THREE.Color(color).convertSRGBToLinear(),metalness,roughness,opacity,transparent:opacity<1,side:THREE.DoubleSide,envMapIntensity:.5});
const metal=material('#bdc5ca',.92,.28),bright=material('#dde1e1',.8,.22),graphite=material('#242d32',.35,.4),rubber=material('#151e23',0,.78),white=material('#e2e7e5',.2,.31),copper=material('#bb783e',.85,.29);
function mesh(geometry,mat,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
function box(p,w,h,d,m,x=0,y=0,z=0){return mesh(new THREE.BoxGeometry(w,h,d),m,p,x,y,z);}
function cyl(p,r,h,m,x=0,y=0,z=0){return mesh(new THREE.CylinderGeometry(r,r,h,64),m,p,x,y,z);}
function link(p,a,b,r,m){const v=new THREE.Vector3(...a),v2=new THREE.Vector3(...b),delta=v2.clone().sub(v),o=cyl(p,r,delta.length(),m);o.position.copy(v.add(v2).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return o;}
function bolt(p,x,y,z,front=false){const b=mesh(new THREE.CylinderGeometry(.026,.026,.024,6),bright,p,x,y,z);if(front)b.rotation.x=Math.PI/2;const slot=box(p,.025,.007,.005,graphite,x,y,z+.014);if(!front){slot.position.set(x,y+.014,z);slot.rotation.x=Math.PI/2;}}
function screws(p,r,y){for(let i=0;i<8;i++){const a=i/8*Math.PI*2;bolt(p,Math.cos(a)*r,y,Math.sin(a)*r);}}
// Annular sections have an inner wall, closed end surfaces and closed cut faces.
function sleeveGeometry(outer,inner,height,cut=false){
  const s=new THREE.Shape(),start=cut?Math.PI*.82:0,end=cut?Math.PI*2.18:Math.PI*2;
  s.absarc(0,0,outer,start,end,false);
  if(cut){s.lineTo(inner*Math.cos(end),inner*Math.sin(end));s.absarc(0,0,inner,end,start,true);s.closePath();}
  else{const hole=new THREE.Path();hole.absarc(0,0,inner,0,Math.PI*2,true);s.holes.push(hole);}
  const g=new THREE.ExtrudeGeometry(s,{depth:height,bevelEnabled:false,steps:1,curveSegments:64});g.translate(0,0,-height/2);g.rotateX(Math.PI/2);return g;
}
function sleeve(p,r,inner,h,m,y=0,cut=false){return mesh(sleeveGeometry(r,inner,h,cut),m,p,0,y);}
function wire(p,points){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v))),32,.023,8,false),rubber,p);}
const ground=new THREE.Group();scene.add(ground);cyl(ground,3.4,.08,material('#d8d5c1',0,.95),0,-.07);
const grid=new THREE.GridHelper(6.4,24,0xb9c2ad,0xd1d6c7);grid.position.y=-.022;grid.material.transparent=true;grid.material.opacity=.35;ground.add(grid);
const footprint=mesh(new THREE.RingGeometry(2.2,2.21,128),material('#7ca994',0,.8,.45),ground,0,.005);footprint.rotation.x=-Math.PI/2;
const equipment=new THREE.Group();scene.add(equipment);cyl(equipment,.095,5.5,metal,0,2.8,-.32);cyl(equipment,.13,.34,graphite,0,1.72,-.32);
for(let i=0;i<3;i++){const a=i*Math.PI*2/3+.3,x=Math.sin(a)*1.48,z=Math.cos(a)*1.48-.32;link(equipment,[0,1.73,-.32],[x,.1,z],.052,metal);link(equipment,[x*.86,.30,z*.86-.045],[x,.07,z],.067,rubber);link(equipment,[0,.9,-.32],[x*.56,.84,(z+.32)*.56-.32],.021,graphite);}
[1.8,2.65,3.7,4.7].forEach(y=>{cyl(equipment,.133,.10,graphite,0,y,-.32);box(equipment,.28,.1,.16,metal,0,y,-.23);bolt(equipment,.11,y,-.13,true);});
function roundedBox(w,h,d,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:.016,bevelThickness:.015,bevelSegments:3,steps:1,curveSegments:12});g.translate(0,0,-d/2);return g;}
mesh(roundedBox(1.13,1.48,.43,.08),white,equipment,0,4.12,.02);mesh(roundedBox(1.07,1.42,.025,.07),graphite,equipment,0,4.12,.25);mesh(roundedBox(1.06,1.41,.06,.07),white,equipment,0,4.12,.294);
for(const x of[-.45,.45])for(const y of[3.52,4.72])bolt(equipment,x,y,.336,true);
[3.72,4.5].forEach(y=>{box(equipment,.09,.19,.13,metal,-.596,y,.10);cyl(equipment,.036,.23,graphite,-.63,y,.1);});
cyl(equipment,.057,.11,graphite,.73,3.79,.02);link(equipment,[.55,3.8,.02],[.74,3.8,.02],.055,graphite);cyl(equipment,.042,.65,rubber,.74,4.17,.02);mesh(new THREE.CylinderGeometry(.022,.04,.4,16),rubber,equipment,.74,4.69,.02);mesh(new THREE.SphereGeometry(.022,12,8),rubber,equipment,.74,4.89,.02);
const brand=document.createElement('canvas');brand.width=512;brand.height=300;const ctx=brand.getContext('2d');
ctx.fillStyle='#205b55';ctx.beginPath();ctx.ellipse(238,67,29,53,-.6,0,Math.PI*2);ctx.fill();ctx.fillStyle='#70a77a';ctx.beginPath();ctx.ellipse(285,58,22,44,.6,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#e2e7e5';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(239,103);ctx.lineTo(277,39);ctx.stroke();ctx.textAlign='center';ctx.fillStyle='#194d50';ctx.font='bold 62px Arial';ctx.fillText('AeroCRNS',256,188);ctx.font='22px Arial';ctx.fillStyle='#687778';ctx.fillText('FIELD SENSING SYSTEM',256,237);
const brandTexture=new THREE.CanvasTexture(brand);brandTexture.encoding=THREE.sRGBEncoding;mesh(new THREE.PlaneGeometry(.85,.5),new THREE.MeshBasicMaterial({map:brandTexture,transparent:true}),equipment,0,4.14,.343);
for(const x of[-.31,0,.31]){cyl(equipment,.065,.12,graphite,x,3.3,.07);cyl(equipment,.044,.13,rubber,x,3.20,.07);wire(equipment,[[x,3.18,.07],[x+.025,3.02,.10],[x*.6,2.93,.07],[x*.5,2.80,0]]);}
const panel=new THREE.Group();panel.position.set(0,5.72,-.23);panel.rotation.x=.38;equipment.add(panel);box(panel,2.30,.065,1.42,bright);box(panel,2.20,.016,1.32,graphite,0,.043,0);
const silicon=material('#102c56',.44,.23);
for(let col=0;col<8;col++)for(let row=0;row<4;row++){const x=(col-3.5)*.269,z=(row-1.5)*.32;box(panel,.258,.006,.309,silicon,x,.055,z);[-.055,.055].forEach(dx=>box(panel,.003,.003,.307,bright,x+dx,.06,z));}
for(const x of[-1.10,1.1])for(const z of[-.66,.66])bolt(panel,x,.042,z);link(equipment,[-.55,5.50,-.3],[.55,5.50,-.3],.05,graphite);
const body=new THREE.Group();body.position.set(0,1.94,.06);scene.add(body);
const specs=[
  ['housing','الغلاف المعدني','#bfc9ce',.465,.434,1.9,.9,1],
  ['aerogel','الأيروجيل · 20 mm','#72b6cb',.430,.342,1.84,.02,1],
  ['mantle','عباءة Gd₂O₃','#50575c',.337,.326,1.74,.32,1],
  ['hdpe','جدار HDPE','#303940',.322,.249,1.70,0,1],
  ['cavity','التجويف الهوائي','#b8dbe1',.245,.147,1.58,0,.16],
  ['wall','جدار أنبوب الكاشف','#bcc4c9',.142,.125,1.43,.95,1],
  ['b4c','طلاء ¹⁰B₄C','#b88049',.123,.114,1.41,.7,1],
  ['gas','غاز Ar:CO₂','#83bfa5',.111,.008,1.39,0,.40]
];
// Seeded microtexture hints at aerogel porosity, not a manufacturing specification.
const tex=document.createElement('canvas');tex.width=tex.height=128;const tc=tex.getContext('2d'),pixels=tc.createImageData(128,128);let seed=41;
for(let i=0;i<pixels.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const v=155+seed%100;pixels.data.set([v,v,v,255],i);}tc.putImageData(pixels,0,0);
const pores=new THREE.CanvasTexture(tex);pores.wrapS=pores.wrapT=THREE.RepeatWrapping;pores.repeat.set(5,8);
const layers={};
specs.forEach(([key,label,color,r,ri,h,m,o])=>{const g=new THREE.Group();body.add(g);const mat=material(color,m,key==='aerogel'?.95:.32,o);if(key==='aerogel'){mat.bumpMap=pores;mat.bumpScale=.009;}const full=sleeve(g,r,ri,h,mat),cut=sleeve(g,r,ri,h,mat,0,true);cut.visible=false;g.userData={key,label,h,full,cut,mat,opacity:o};layers[key]=g;});
const fittings=new THREE.Group();body.add(fittings);
const top=new THREE.Group();top.position.y=1.02;fittings.add(top);cyl(top,.485,.115,bright);cyl(top,.14,.08,graphite,0,.085);cyl(top,.07,.12,metal,0,.17);screws(top,.391,.072);
const bottom=new THREE.Group();bottom.position.y=-1.02;fittings.add(bottom);cyl(bottom,.48,.12,bright);screws(bottom,.389,.075);cyl(bottom,.33,.12,graphite,0,-.12);
// Circular holes are cut into a sheet and wrapped to make the lower guard.
function guardGeometry(){const r=.286,h=.40,w=Math.PI*2*r,s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.closePath();for(let row=0;row<3;row++)for(let col=0;col<12;col++){const hole=new THREE.Path();hole.absarc(-w/2+(col+.5)*w/12,(row-1)*.117,.032,0,Math.PI*2,true);s.holes.push(hole);}const g=new THREE.ExtrudeGeometry(s,{depth:.014,bevelEnabled:false,curveSegments:10});const p=g.attributes.position;for(let i=0;i<p.count;i++){const a=p.getX(i)/r,rad=r+p.getZ(i);p.setXYZ(i,Math.sin(a)*rad,p.getY(i),Math.cos(a)*rad);}g.computeVertexNormals();return g;}
const guard=new THREE.Group();guard.position.y=-1.40;fittings.add(guard);mesh(guardGeometry(),metal,guard);cyl(guard,.245,.39,rubber);sleeve(guard,.302,.274,.033,bright,.215);sleeve(guard,.302,.274,.033,bright,-.215);
const tip=mesh(new THREE.ConeGeometry(.293,.36,64),metal,fittings,0,-1.80);tip.rotation.z=Math.PI;
const ends=new THREE.Group();body.add(ends);[-1,1].forEach(sign=>{cyl(ends,.15,.07,graphite,0,sign*.754);cyl(ends,.071,.11,copper,0,sign*.835);cyl(ends,.025,.08,bright,0,sign*.92);});
const rods=new THREE.Group();body.add(rods);for(const x of[-.393,.393]){cyl(rods,.012,1.90,bright,x,0,.12);cyl(rods,.03,.09,graphite,x,.9,.12);}
// Decorative trails do not feed neutron count rates or irrigation state.
const particleGroup=new THREE.Group();scene.add(particleGroup);const particles=[];
for(let i=0;i<28;i++){const group=new THREE.Group(),incoming=i%3!==0,color=incoming?0x4b9bd3:0x66a982;mesh(new THREE.SphereGeometry(.026,8,8),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.65}),group);group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(.045,incoming?.3:-.22,0)]),new THREE.LineBasicMaterial({color,transparent:true,opacity:.28})));const a=i*2.399,r=1.5+i%4*.30;particleGroup.add(group);particles.push({group,x:Math.cos(a)*r,z:Math.sin(a)*r,y:i/28*6,incoming,speed:.2+i%5*.06});}
let mode='assembled',selected='all',moving=!reduced,yaw=.42,pitch=.16,distance=12,distanceGoal=12,dragging=false,px=0,py=0,last=performance.now();
const target=new THREE.Vector3(0,2.9,0),targetGoal=target.clone(),labels=[];
specs.forEach(([key],i)=>{const el=document.createElement('span');el.className='part-label';el.textContent=i?String(i).padStart(2,'0'):'الغلاف';$('part-labels').appendChild(el);labels.push({key,el});});
function fitDistance(){const a=innerWidth/viewHeight(),f=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),s=mode==='assembled'?[3.5,6.15]:mode==='cutaway'?[1.75,3.5]:innerWidth<540?[4.8,5.3]:[7.4,3.5];return Math.max(s[1]/2/f,s[0]/2/f/a)*1.23;}
function layerPosition(i){return mode!=='exploded'?new THREE.Vector3():innerWidth<540?new THREE.Vector3((i%4-1.5)*1.2,i<4?1.22:-1.22,0):new THREE.Vector3((i-3.5)*.88,(i-3.5)*.09,0);}
function place(){camera.position.set(target.x+distance*Math.cos(pitch)*Math.sin(yaw),target.y+distance*Math.sin(pitch),target.z+distance*Math.cos(pitch)*Math.cos(yaw));camera.lookAt(target);}
function emphasis(){Object.values(layers).forEach(g=>{const d=g.userData,m=d.mat;m.opacity=selected==='all'?d.opacity:d.key===selected?Math.max(.8,d.opacity):.09;m.transparent=m.opacity<1;m.depthWrite=m.opacity>=.5;m.emissive.set(d.key===selected?'#4b806c':'#000000');m.emissiveIntensity=.16;m.needsUpdate=true;});fittings.traverse(o=>{if(o.isMesh)o.visible=selected==='all';});rods.visible=selected==='all'&&mode==='cutaway';ends.visible=selected==='all';$('layer-name').textContent=selected==='all'?'AeroCRNS · Boron-10':layers[selected].userData.label;parent.postMessage({type:'sensor-mode',mode,selected},location.origin);}
function setMode(next,clear=true){mode=next;if(clear)selected='all';document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));$('mode-caption').textContent={assembled:'النظام المجمّع',cutaway:'مقطع داخلي · الطبقات متداخلة',exploded:'تفكيك توضيحي · الطبقات متباعدة'}[mode];equipment.visible=ground.visible=mode==='assembled';particleGroup.visible=mode==='assembled'&&$('particles').getAttribute('aria-pressed')==='true';Object.values(layers).forEach((g,i)=>{g.userData.full.visible=mode!=='cutaway';g.userData.cut.visible=mode==='cutaway';g.userData.goal=layerPosition(i);});fittings.visible=mode!=='exploded';ends.position.copy(layerPosition(5));$('part-labels').hidden=mode!=='exploded';$('legend').hidden=!particleGroup.visible;$('particles').disabled=mode!=='assembled';$('motion').disabled=!particleGroup.visible;targetGoal.set(0,mode==='assembled'?2.9:mode==='cutaway'?1.65:1.94,0);yaw=mode==='assembled'?.42:mode==='cutaway'?.12:.14;pitch=mode==='exploded'?.28:.16;distanceGoal=fitDistance();emphasis();if(reduced){target.copy(targetGoal);distance=distanceGoal;Object.values(layers).forEach(g=>g.position.copy(g.userData.goal));}parent.postMessage({type:'sensor-mode',mode,selected},location.origin);}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
function motionLabel(){$('motion').textContent=moving?'إيقاف الحركة':'تشغيل الحركة';$('motion').setAttribute('aria-pressed',String(moving));}
$('motion').onclick=()=>{moving=!moving;motionLabel();};motionLabel();$('reset').onclick=()=>setMode(mode,false);
$('particles').onclick=()=>{const v=$('particles').getAttribute('aria-pressed')!=='true';$('particles').setAttribute('aria-pressed',String(v));particleGroup.visible=v&&mode==='assembled';$('legend').hidden=!particleGroup.visible;$('motion').disabled=!particleGroup.visible;};
function zoom(f){distanceGoal=THREE.MathUtils.clamp(distanceGoal*f,fitDistance()*.42,fitDistance()*2.4);}
$('zoom-in').onclick=()=>zoom(.85);$('zoom-out').onclick=()=>zoom(1.18);
canvas.addEventListener('pointerdown',e=>{dragging=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);canvas.focus();});canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);canvas.addEventListener('pointermove',e=>{if(!dragging)return;yaw-=(e.clientX-px)*.008;pitch=THREE.MathUtils.clamp(pitch+(e.clientY-py)*.006,-.75,1.25);px=e.clientX;py=e.clientY;});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(e.deltaY*.001));},{passive:false});
canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.12;if(e.key==='ArrowRight')yaw+=.12;if(e.key==='ArrowUp')pitch=Math.min(1.25,pitch+.08);if(e.key==='ArrowDown')pitch=Math.max(-.75,pitch-.08);if(['+','='].includes(e.key))zoom(.88);if(e.key==='-')zoom(1.14);});
addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='layer')return;const k=e.data.layer;if(k!=='all'&&(!layers[k]||k==='housing'))return;selected=k;if(mode==='assembled'&&k!=='all')setMode('cutaway',false);else emphasis();});
addEventListener('resize',()=>{camera.aspect=innerWidth/viewHeight();camera.updateProjectionMatrix();renderer.setSize(innerWidth,viewHeight());distanceGoal=fitDistance();Object.values(layers).forEach((g,i)=>g.userData.goal=layerPosition(i));ends.position.copy(layerPosition(5));});
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(!document.hidden){const blend=reduced?1:1-Math.exp(-dt*9);target.lerp(targetGoal,blend);distance+=(distanceGoal-distance)*blend;Object.values(layers).forEach(g=>g.position.lerp(g.userData.goal,blend));if(moving)particles.forEach(p=>{p.y+=dt*p.speed*(p.incoming?-1:1);if(p.y<0)p.y=6;if(p.y>6)p.y=0;});particles.forEach(p=>p.group.position.set(p.x,p.y,p.z));place();renderer.render(scene,camera);if(mode==='exploded')labels.forEach(({key,el})=>{const g=layers[key],p=new THREE.Vector3(0,-g.userData.h/2-.22,0);g.localToWorld(p);p.project(camera);el.style.left=(p.x*.5+.5)*innerWidth+'px';el.style.top=(100+(-p.y*.5+.5)*viewHeight())+'px';el.style.visibility=Math.abs(p.z)>1?'hidden':'visible';});}requestAnimationFrame(frame);}
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();$('status').textContent='توقف العرض الرسومي. أعد تحميل الصفحة لاستعادته.';});
setMode('assembled');distance=distanceGoal;target.copy(targetGoal);place();$('status').textContent='اسحب للتدوير · العجلة للتقريب';requestAnimationFrame(frame);
}catch(error){console.error('AeroCRNS sensor viewer:',error);document.body.classList.add('unavailable');document.body.insertAdjacentHTML('beforeend','<div class="fallback"><strong>تعذّر تشغيل العرض ثلاثي الأبعاد.</strong><p>أعد تحميل الصفحة أو استخدم متصفحًا يدعم WebGL. مواصفات الطبقات متاحة في اللوحة المجاورة.</p></div>');}
