"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EditorialImage } from "@/components/editorial-image";
import { sceneProgress,smoothRange } from "@/lib/scroll-scenes";

type Props={label:string;title:string;italic:string;image:string;alt:string;description?:string;secondTitle:string;secondItalic:string;href:string;action:string;closing?:boolean;caption?:string};
export function ScrollChapter(p:Props){
 const ref=useRef<HTMLElement>(null);
 useEffect(()=>{
  const element=ref.current;if(!element)return;
  const pin=element.querySelector<HTMLElement>(".chapter-pin")!;
  const a=element.querySelector<HTMLElement>(".chapter-first")!,b=element.querySelector<HTMLElement>(".chapter-second")!;
  const mq=matchMedia("(prefers-reduced-motion: reduce)");let frame=0,disposed=false;
  const update=()=>{
   frame=0;const enabled=!mq.matches&&innerWidth>=700;
   element.dataset.enhanced=String(enabled);
   const r=element.getBoundingClientRect();const progress=sceneProgress(r.top,r.height,pin.offsetHeight);
   const t=enabled?smoothRange(0,.85,progress):0;
   const first=enabled?1-smoothRange(.23,.54,progress):1,second=enabled?smoothRange(.48,.77,progress):0;
   element.style.setProperty("--chapter-progress",String(t));element.style.setProperty("--chapter-first",String(first));element.style.setProperty("--chapter-second",String(second));
   a.style.visibility=first>.015?"visible":"hidden";b.style.visibility=second>.015?"visible":"hidden";
   a.setAttribute("aria-hidden",String(first<.015));b.setAttribute("aria-hidden",String(second<.015));
  };
  const schedule=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);mq.addEventListener("change",schedule);
  const ro=new ResizeObserver(schedule);ro.observe(element);void document.fonts.ready.then(schedule);
  return()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);mq.removeEventListener("change",schedule);};
 },[]);
 const Title=p.closing?"h2":"h1";
 return <section ref={ref} className={`scroll-chapter ${p.closing?"chapter-closing":"chapter-opening"}`} aria-label={p.label}>
  <div className="chapter-pin"><div className="chapter-frame"><div className="chapter-image"><EditorialImage name={p.image} alt={p.alt} priority={!p.closing}/></div><div className="chapter-shade"/>
   <div className="chapter-first"><p className="eyebrow">{p.label}</p><Title>{p.title}<br/><em>{p.italic}</em></Title>{p.description&&<p className="chapter-description">{p.description}</p>}</div>
   <div className="chapter-second" aria-hidden="true"><p className="eyebrow">{p.label}</p><p className="chapter-display">{p.secondTitle}<br/><em>{p.secondItalic}</em></p></div>
   <div className="chapter-bottom"><span>{p.caption||"BATUMI & NEW GUDAURI · GEORGIA"}</span><a className="button" href={p.href}>{p.action}{p.href.startsWith("#")?<ArrowDown size={18}/>:<ArrowUpRight size={18}/>}</a></div>
  </div></div>
 </section>;
}
