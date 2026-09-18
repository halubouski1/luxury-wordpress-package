"use client";
import {useEffect,useRef} from "react";
import {ArrowDown,ArrowUpRight,MapPin} from "lucide-react";
import {EditorialImage} from "@/components/editorial-image";
export function ExperienceHero(){
 const ref=useRef<HTMLElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return;const mq=matchMedia("(prefers-reduced-motion: reduce)");let frame=0;
  const update=()=>{frame=0;const enabled=!mq.matches&&innerWidth>=700;const rect=el.getBoundingClientRect();const progress=enabled?Math.min(1,Math.max(0,-rect.top/rect.height)):0;el.style.setProperty("--experience-progress",String(progress));};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);mq.addEventListener("change",schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);mq.removeEventListener("change",schedule);};
 },[]);
 return <section ref={ref} className="experience-hero" aria-labelledby="experience-title">
  <div className="experience-hero-frame"><EditorialImage name="experiences-overlook" alt="Batumi and the Black Sea seen from the green hills above the city" priority/><div className="experience-hero-shade"/></div>
  <div className="experience-hero-copy"><p className="eyebrow">EXPERIENCES / BEYOND YOUR APARTMENT</p><h1 id="experience-title">Beyond your stay.<br/><em>Your kind of journey.</em></h1><p className="experience-hero-description">From Georgia to Zanzibar.<br/>Discover our experiences and travel services.</p><div className="experience-hero-actions"><a href="#explore" className="button">Explore experiences<ArrowDown size={19}/></a><a href="/contact-us/" className="experience-hero-contact">Plan your journey<ArrowUpRight size={17}/></a></div></div>
  <div className="experience-hero-bottom"><span><MapPin size={14}/>BATUMI, GEORGIA</span><a href="#explore" aria-label="Explore the four experience collections"><span>FOUR WAYS TO GO BEYOND</span><ArrowDown size={18}/></a></div>
 </section>;
}
