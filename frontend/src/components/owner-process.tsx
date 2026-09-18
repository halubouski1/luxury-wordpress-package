"use client";
import { useEffect,useRef,useState } from "react";
import { EditorialImage } from "@/components/editorial-image";
import { guestTimeline } from "@/lib/scroll-scenes";
const stages=[
 {title:"Onboarding",lead:"A considered beginning.",text:"We start with your apartment and the management work it needs. A clear introduction gives our team the context to organise the everyday details of hosting.",image:"orbi-c",alt:"A sea-view apartment in Orbi City"},
 {title:"Marketing",lead:"Put your property in view.",text:"Property marketing and reservations are managed together, giving guests a clear path from discovering your apartment to arranging their stay.",image:"batumi-architecture",alt:"Batumi waterfront architecture"},
 {title:"Guest operations",lead:"Every stay, looked after.",text:"Our team handles guest service and communication, with housekeeping organised as part of the same operation. Your guests have a team to turn to throughout their stay.",image:"orbi-a",alt:"The living space of a two-bedroom Orbi City apartment"},
 {title:"Quality control",lead:"Care you can rely on.",text:"Housekeeping and property control support a consistent standard. Our own cleaning and laundry services keep essential preparation within one team.",image:"orbi-detail",alt:"A carefully prepared apartment bedroom"},
 {title:"Monthly reporting",lead:"A clear view, wherever you are.",text:"Monthly reporting keeps you informed about your property. You have a direct route to the team and a regular opportunity to discuss the details.",image:"gudauri-dusk",alt:"Snow-covered mountains in Gudauri at sunset"},
];
export function OwnerProcess(){
 const ref=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);
 useEffect(()=>{
  const el=ref.current;if(!el)return;const mq=matchMedia("(prefers-reduced-motion: reduce)");
  const steps=Array.from(el.querySelectorAll<HTMLElement>(".owner-stage")),layers=Array.from(el.querySelectorAll<HTMLElement>(".process-photo-layer"));let frame=0;
  const update=()=>{frame=0;el.dataset.enhanced=String(!mq.matches&&innerWidth>=900);const state=guestTimeline(steps.map(s=>{const r=s.getBoundingClientRect();return r.top+r.height/2;}),innerHeight*.52);layers.forEach((layer,i)=>{layer.style.opacity=String(state.opacities.slice(i).reduce((a,b)=>a+b,0));layer.setAttribute("aria-hidden",String(i!==state.active));});setActive(state.active);};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);mq.addEventListener("change",schedule);const ro=new ResizeObserver(schedule);steps.forEach(step=>ro.observe(step));
  return()=>{cancelAnimationFrame(frame);ro.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);mq.removeEventListener("change",schedule);};
 },[]);
 return <div className="owner-process" ref={ref}><div className="owner-stages">{stages.map((stage,i)=><article className="owner-stage" key={stage.title} id={`process-${i+1}`}><figure className="owner-stage-mobile"><EditorialImage name={stage.image} alt={stage.alt}/></figure><div className="owner-stage-count"><span>0{i+1}</span><span>{stage.title}</span></div><h3>{stage.lead}</h3><p>{stage.text}</p></article>)}</div><figure className="process-sticky"><div className="process-photo">{stages.map((stage,i)=><div key={stage.title} className="process-photo-layer" aria-hidden={i!==active}><EditorialImage name={stage.image} alt={stage.alt} sizes="50vw"/></div>)}<div className="process-overlay"/><figcaption><span>0{active+1} / 05</span><span>{stages[active].title}</span></figcaption></div><p className="photo-caption">ONE TEAM. THROUGH EVERY STAGE.</p></figure></div>;
}
