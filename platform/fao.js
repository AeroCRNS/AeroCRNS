/* Equations 1–5 and Tables 1–2 of the supplied AeroCRNS threshold paper. */
(function(root){
'use strict';
const soils={
 'Sandy':[[.07,.17],[.02,.07]],'Loamy Sand':[[.11,.19],[.03,.10]],
 'Sandy Loam':[[.18,.28],[.06,.16]],'Loam':[[.20,.30],[.07,.17]],
 'Silt Loam':[[.22,.36],[.09,.21]],'Silt':[[.28,.36],[.12,.22]],
 'Silty Clay Loam':[[.30,.37],[.17,.24]],'Silty Clay':[[.30,.42],[.17,.29]],'Clay':[[.32,.40],[.20,.24]]
};
const crops={Onion:{p:.30,z:[.3,.6]},Potato:{p:.35,z:[.4,.6]},Tomato:{p:.40,z:[.7,1.5]},Wheat:{p:.55,z:[1,1.5]},Barley:{p:.55,z:[1,1.5]},Maize:{p:.55,z:[1,1.7]},Olive:{p:.65,z:[1.2,1.7],perennial:true},'Date Palm':{p:.50,z:[1.5,2.5],perennial:true}};
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const midpoint=r=>(r[0]+r[1])/2;
function soilValues(id){const s=soils[id];return s?{fc:midpoint(s[0]),wp:midpoint(s[1])}:null;}
function calculate(x){
 for(const k of ['fc','wp','p0','etc','texture','zmin','zmax','day','fullDay','root'])if(!Number.isFinite(x[k]))throw Error('Invalid '+k);
 if(x.wp<0||x.fc<=x.wp||x.fc>.6||x.p0<0||x.p0>1||x.etc<0||x.texture<-.1||x.texture>.1)throw Error('Invalid soil, crop or weather values');
 if(!['growth','direct'].includes(x.mode)||x.zmin<=0||x.zmax<x.zmin||x.fullDay<=0||x.day<0||x.root<=0)throw Error('Invalid root inputs');
 for(const k of ['efficiency','rate','area'])if(x[k]!==null && (!Number.isFinite(x[k])||x[k]<=0))throw Error('Invalid '+k);
 if(x.efficiency!==null&&x.efficiency>1)throw Error('Efficiency must be at most 1');
 const climateP=clamp(x.p0+.04*(5-x.etc),.1,.8);
 const adjustedP=clamp(climateP*(1+x.texture),.1,.8);
 const z=x.mode==='direct'?x.root:x.zmin+(x.zmax-x.zmin)*clamp(x.day/x.fullDay,0,1);
 const taw=1000*(x.fc-x.wp)*z,raw=adjustedP*taw;
 return {baseThreshold:x.fc-x.p0*(x.fc-x.wp),climateP,adjustedP,threshold:x.fc-adjustedP*(x.fc-x.wp),z,taw,raw};
}
function irrigation(x,r,vwc){
 if(!Number.isFinite(vwc))throw Error('Invalid moisture');
 const deficit=Math.max(0,1000*(x.fc-vwc)*r.z);
 const open=vwc<=r.threshold+1e-12;
 const net=open?deficit:0;
 const gross=x.efficiency===null?null:net/x.efficiency;
 return {deficit,open,net,gross,volume:gross===null||x.area===null?null:gross*x.area/1000,hours:gross===null||x.rate===null?null:gross/x.rate};
}
const api={soils,crops,soilValues,calculate,irrigation};root.AeroFAO=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
