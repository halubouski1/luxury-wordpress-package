"use client";
import { useEffect,useRef,useState } from "react";
import { ArrowDown,ArrowUpRight,MapPin,Pause,Play } from "lucide-react";
import { Wordmark } from "@/components/site-motion";

const slides=[
 {name:"batumi-hero",width:2400,height:1400,medium:1600,mobile:"batumi-hero-mobile",alt:"Batumi’s Black Sea waterfront in soft evening light",offer:"by the sea.",location:"BATUMI, GEORGIA",note:"THE BLACK SEA COLLECTION"},
 {name:"gudauri-dusk",width:2400,height:1523,medium:1440,mobile:"gudauri-dusk-mobile",alt:"Snow-covered Caucasus peaks at sunset in Gudauri",offer:"in the mountains.",location:"NEW GUDAURI, GEORGIA",note:"THE MOUNTAIN COLLECTION"},
 {name:"tbilisi-dusk",width:2400,height:1590,medium:1440,mobile:"tbilisi-dusk-mobile",alt:"Tbilisi rooftops and the Mtatsminda tower against a soft sunset sky",offer:"in Georgia.",location:"TBILISI, GEORGIA",note:"DISCOVER GEORGIA"}
];
export function HeroSlideshow(){
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
 const ref=useRef<HTMLDivElement>(null),visible=useRef(true),loaded=useRef(new Set([0]));
 useEffect(()=>{const mq=matchMedia("(prefers-reduced-motion: reduce)"),change=()=>setReduced(mq.matches);change();mq.addEventListener("change",change);
  ref.current?.querySelectorAll<HTMLImageElement>("img").forEach((img,i)=>{void img.decode().then(()=>loaded.current.add(i)).catch(()=>{});});
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;},{threshold:.1});if(ref.current)observer.observe(ref.current);
  return()=>{mq.removeEventListener("change",change);observer.disconnect();};},[]);
 useEffect(()=>{if(paused||reduced)return;const timer=window.setInterval(()=>{
  if(document.hidden||document.documentElement.dataset.intro||!visible.current)return;
  setActive(current=>{const next=(current+1)%slides.length;return loaded.current.has(next)?next:current;});
 },6500);return()=>clearInterval(timer);},[paused,reduced]);
 const slide=slides[active];
 return <>
  <div className="hero-gallery" ref={ref} aria-label="Batumi, Gudauri and Tbilisi photographs">
   {slides.map((s,i)=><picture key={s.name} className={`hero-picture hero-slide ${active===i?"is-active":""}`} aria-hidden={active!==i}><source media="(max-width:760px)" srcSet={`/images/${s.mobile}.webp`}/><img src={`/images/${s.name}.webp`} srcSet={`/images/${s.name}-medium.webp ${s.medium}w, /images/${s.name}.webp ${s.width}w`} sizes="100vw" width={s.width} height={s.height} alt={s.alt} fetchPriority={i===0?"high":"low"} decoding="async" onLoad={()=>loaded.current.add(i)}/></picture>)}
  </div>
  <div className="hero-shade"/><div className="hero-logo brand" role="img" aria-label="Luxury Apart Hotel"><Wordmark/></div>
  <a className="hero-intro-cue" href="#hero-offer"><span>SCROLL TO DISCOVER</span><ArrowDown size={20}/></a>
  <div className="hero-content"><p className="eyebrow">A GEORGIAN STAY, BEAUTIFULLY CONSIDERED</p><h1 id="hero-title">At home,<br/><em className={active===1?"mountain-offer":""}>{slide.offer}</em></h1><p className="hero-description">Your own space. Hotel-level care.<br/>Exceptional stays in Batumi &amp; New Gudauri.</p><div className="hero-actions"><a href="https://luxuryaparthotel.ge/apartments/" className="button button-light">Book an apartment<ArrowUpRight size={20}/></a><a href="/for-owners/" className="hero-owner-link">List your property<ArrowUpRight size={16}/></a><button className="hero-slideshow-toggle" type="button" onClick={()=>reduced?setActive(v=>(v+1)%slides.length):setPaused(v=>!v)} aria-label={reduced?"Show next destination photograph":paused?"Resume photograph slideshow":"Pause photograph slideshow"} title={reduced?"Next photograph":paused?"Play":"Pause"}>{reduced?<ArrowUpRight size={16}/>:paused?<Play size={15}/>:<Pause size={15}/>}</button></div>

  </div>
  <div className="hero-bottom"><span><MapPin size={14}/>{slide.location}</span><a href="#about" aria-label="Discover Luxury Apart Hotel"><span>EXPLORE YOUR STAY</span><ArrowDown size={19}/></a></div><span className="hero-side-note" aria-hidden="true">{slide.note}</span>
 </>;
}
