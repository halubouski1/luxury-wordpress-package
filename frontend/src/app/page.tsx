"use client";
import { useEffect, useRef, useState } from "react";
import { clamp, smoothRange, sceneProgress, heroTimeline, finaleTimeline, guestTimeline } from "@/lib/scroll-scenes";
import { ArrowUpRight, ArrowRight, ArrowDown, Waves, MountainSnow, Sparkles, Wind, Headphones, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SiteMotion } from "@/components/site-motion";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { EditorialImage } from "@/components/editorial-image";
const original = "https://luxuryaparthotel.ge";
const booking = `${original}/apartments/`;
const owners = "/for-owners/";
const apartments = [
 { name:"A front-row seat to the sea",code:"ORBI · C · 41/53",location:"Batumi · Orbi City",bedrooms:"1 bedroom",area:"45 m²",guests:"4 guests",price:80,image:"orbi-c",alt:"Bedroom and sea-view balcony in ORBI C 41/53",href:`${original}/rooms/orbi-c-41-53/` },
 { name:"Room for everyone",code:"ORBI · A · 38/03",location:"Batumi · Orbi City",bedrooms:"2 bedrooms",area:"78 m²",guests:"6 guests",price:130,image:"orbi-a",alt:"Panoramic living room in the two-bedroom ORBI A 38/03 apartment",href:`${original}/rooms/orbi-a-38-03/` },
 { name:"A change of altitude",code:"4 SEASON · F2 · 4/30",location:"New Gudauri · Four Seasons",bedrooms:"Studio",area:"33 m²",guests:"4 guests",price:70,image:"gudauri",alt:"Mountain-view studio in Four Seasons F2 4/30, New Gudauri",href:`${original}/rooms/4-season-f2-4-30/` }
];
const benefits = [
 {title:"The mountains, on your doorstep.",text:"Wake up to the Caucasus. Our Four Seasons apartments in New Gudauri place you just 100 metres from the cable car and ski lifts, with your own peaceful space to return to.",caption:"01 / A SENSE OF PLACE",image:"gudauri-dusk",alt:"The snowy Caucasus mountains at sunset in Gudauri"},
 {title:"Your own space. Your own pace.",text:"Slow breakfasts in your own kitchen. A balcony to linger on. Choose a studio or an apartment with separate bedrooms, and settle into a stay that feels like yours.",caption:"02 / ROOM TO FEEL AT HOME",image:"orbi-detail",alt:"A private balcony looking out over the Black Sea from an ORBI City apartment in Batumi"},
 {title:"Arrive. Exhale. Enjoy.",text:"Arrange an airport or private transfer, stay connected with high-speed Wi-Fi, and find help whenever you need it. More time for Batumi, less time organising the details.",caption:"03 / THE DETAILS, TAKEN CARE OF",image:"batumi-life",alt:"The palm-lined promenade in Batumi, made for an unhurried afternoon"}
];
const services = [
 {Icon:Sparkles,title:"Housekeeping, in-house",text:"Our own housekeeping team looks after apartment cleaning, with hotel-level care and direct quality control."},
 {Icon:Wind,title:"Our own laundry",text:"Linen care stays with our full-cycle laundry service, serving our apartments and partner hotels in Batumi."},
 {Icon:Headphones,title:"A team, around the clock",text:"Guest communication is handled by our team. With support available 24/7, there is always someone to turn to."}
];
function Photo({name,alt,className="",sizes="(max-width: 760px) 100vw, 50vw"}:{name:string;alt:string;className?:string;sizes?:string}) {if(name==="gudauri-dusk")return <EditorialImage name={name} alt={alt} sizes={sizes}/>;return <img className={className} src={`/images/${name}.webp`} srcSet={`/images/${name}-small.webp 640w, /images/${name}.webp 1200w`} sizes={sizes} width="1200" height="1500" alt={alt} loading="lazy" decoding="async" />}
export default function Home(){
 const [menuOpen,setMenuOpen]=useState(false),[activeBenefit,setActiveBenefit]=useState(0);
 const heroRef=useRef<HTMLElement>(null),sceneRef=useRef<HTMLDivElement>(null),finalRef=useRef<HTMLElement>(null),headerRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
  const root=document.documentElement;
  let frame=0,disposed=false;
  const hero=heroRef.current,finale=finalRef.current,scene=sceneRef.current,header=headerRef.current;
  const heroPin=hero?.querySelector<HTMLElement>(".hero-pin");
  const finalPin=finale?.querySelector<HTMLElement>(".finale-pin");
  const offer=hero?.querySelector<HTMLElement>(".hero-content");
  const cue=hero?.querySelector<HTMLElement>(".hero-intro-cue");
  const logo=hero?.querySelector<HTMLElement>(".hero-logo");
  const opening=finale?.querySelector<HTMLElement>(".final-opening");
  const invite=finale?.querySelector<HTMLElement>(".final-invite");
  const steps=Array.from(scene?.querySelectorAll<HTMLElement>(".guest-step")??[]);
  const photos=Array.from(scene?.querySelectorAll<HTMLElement>(".guest-photo-layer")??[]);
  const setVisible=(el:HTMLElement|null|undefined,visible:boolean)=>{
   if(el){el.dataset.visible=String(visible);el.inert=!visible;}
  };
  const update=()=>{
   frame=0;
   const animated=!preference.matches,mobile=window.innerWidth<900;
   root.dataset.scrollScenes=animated?"on":"off";
   let menu=1;
   if(hero&&heroPin){
    const r=hero.getBoundingClientRect();
    const p=sceneProgress(r.top,r.height,heroPin.offsetHeight);
    const state=heroTimeline(animated?p:1);
    hero.style.setProperty("--frame",String(state.frame));
    hero.style.setProperty("--logo",String(state.logo));
    hero.style.setProperty("--offer",String(state.offer));
    setVisible(offer,state.offer>.05);
    setVisible(cue,animated&&state.logo>.12);
    setVisible(logo,animated&&state.logo>.02);
    menu=state.menu;
   }
   if(finale&&finalPin){
    const r=finale.getBoundingClientRect();
    const p=sceneProgress(r.top,r.height,finalPin.offsetHeight);
    const state=finaleTimeline(animated?p:1);
    finale.style.setProperty("--expansion",String(state.expansion));
    finale.style.setProperty("--opening",String(state.opening));
    finale.style.setProperty("--invitation",String(state.invitation));
    setVisible(opening,animated&&state.opening>.05);
    setVisible(invite,state.invitation>.05);
    // Give the photograph the whole viewport, then return navigation as the scene leaves.
    const finalFocus=animated?smoothRange(0,.12,p)*smoothRange(finalPin.offsetHeight*.25,finalPin.offsetHeight*.75,r.bottom):0;
    menu*=1-finalFocus;
   }
   if(header){
    header.style.setProperty("--menu",String(menu));
    setVisible(header,menu>.12);
   }
   if(scene&&steps.length){
    const center=window.innerHeight*.5;
    const bounds=steps.map(step=>step.getBoundingClientRect());
    const state=guestTimeline(bounds.map(b=>b.top+b.height/2),center);
    photos.forEach((photo,i)=>{
     photo.style.setProperty("--photo-opacity",String(state.opacities.slice(i).reduce((sum,value)=>sum+value,0)));
     photo.style.setProperty("--photo-scale",String(animated&&!mobile?1.035-state.opacities[i]*.035:1));
     photo.setAttribute("aria-hidden",String(i!==state.active));
    });
    steps.forEach((step,i)=>step.style.setProperty("--emphasis",String(animated&&!mobile?clamp(1-Math.abs(bounds[i].top+bounds[i].height/2-center)/(window.innerHeight*.65)):1)));
    setActiveBenefit(state.active);
   }
  };
  const schedule=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(update)};
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule);
  window.addEventListener("pageshow",schedule);
  preference.addEventListener("change",schedule);
  const resizeObserver=new ResizeObserver(schedule);
  if(hero)resizeObserver.observe(hero);
  if(finale)resizeObserver.observe(finale);
  steps.forEach(step=>resizeObserver.observe(step));
  update();
  void document.fonts.ready.then(schedule);
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el=>{if(!preference.matches&&el.getBoundingClientRect().top>window.innerHeight)el.classList.add("reveal-pending");observer.observe(el)});
  return()=>{
   disposed=true;cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();
   window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);window.removeEventListener("pageshow",schedule);preference.removeEventListener("change",schedule);
   delete root.dataset.scrollScenes;
  };
 },[]);
 return <>
  <SiteMotion menuOpen={menuOpen}/>
  <a className="skip-link" href="#about">Skip intro and go to content</a>
  <SiteHeader home menuOpen={menuOpen} onMenuChange={setMenuOpen} headerRef={headerRef}/>
  <main id="main">
   <section className="hero-scene" id="top" ref={heroRef} aria-labelledby="hero-title">
    <div id="hero-offer" className="hero-offer-anchor" aria-hidden="true" />
    <div className="hero-pin"><div className="hero">
     <HeroSlideshow/>
    </div></div>
   </section>
   <div className="destination-strip"><span>SEA AIR. CITY LIFE. YOUR OWN SPACE.</span><span>BATUMI <span className="strip-line"/> NEW GUDAURI</span></div>
   <section className="intro section-wrap" id="about" tabIndex={-1} aria-labelledby="intro-title"><div className="section-label" data-reveal><span className="mini-line"/> THE ART OF FEELING AT HOME</div><div className="intro-main" data-reveal><h2 id="intro-title">The freedom of an apartment.<br/><em>The care of a hotel.</em></h2><div className="intro-copy"><p>Some places invite you to slow down. To open the balcony doors, put the kettle on, and feel that you belong.</p><div><p>Since 2015, we’ve brought thoughtful hospitality to privately managed apartments in Batumi and New Gudauri. From your first hello to the freshly cared-for linen, the details stay in our hands.</p><a className="text-link" href="/about-us/">A little more about us <ArrowUpRight size={18}/></a></div></div></div><div className="brand-facts" data-reveal><div><span className="fact-value">2015</span><span>OUR STORY BEGAN</span></div><div><span className="fact-value">Two places.</span><span>ONE STANDARD OF CARE</span></div><div><span className="fact-value">24 / 7</span><span>HERE FOR OUR GUESTS</span></div></div></section>
   <section className="experience section-wrap" id="experience" aria-labelledby="experience-title"><div className="section-heading" data-reveal><div><p className="eyebrow">THE GUEST EXPERIENCE</p><h2 id="experience-title">Less to think about.<br/><em>More to feel.</em></h2></div><p className="heading-aside">A morning by the water.<br/>An afternoon with no plans.<br/>A place that’s yours to come back to.</p></div><div className="guest-scene" ref={sceneRef}><figure className="guest-sticky"><div className="guest-photo-frame">{benefits.map((b,i)=><div key={b.image} className={`guest-photo-layer guest-photo-layer-${i}`} aria-hidden={i!==activeBenefit}><Photo name={b.image} alt={b.alt}/></div>)}<div className="guest-photo-shade"/><figcaption>{activeBenefit===0?<MountainSnow size={32} strokeWidth={1}/>:<Waves size={32} strokeWidth={1}/>}<span>{benefits[activeBenefit].caption}</span><div className="scene-progress" aria-hidden="true">{benefits.map((_,i)=><span key={i} className={i===activeBenefit?"active":""}/>)}</div></figcaption></div><span className="photo-caption">A LITTLE CLOSER TO THE LIFE YOU CAME FOR.</span></figure><div className="guest-steps">{benefits.map((b,i)=><article key={b.title} className={`guest-step ${activeBenefit===i?"active":""}`}><figure className="guest-mobile-photo"><Photo name={b.image} alt={b.alt} sizes="(max-width: 600px) 100vw, 33vw"/></figure><div className="step-top"><span>0{i+1}</span><span className="step-line"/></div><h3>{b.title}</h3><p>{b.text}</p>{i===2&&<a className="text-link" href={booking}>Find your place <ArrowUpRight size={18}/></a>}</article>)}</div></div></section>
   <section className="apartments section-wrap" id="apartments" aria-labelledby="apartments-title"><div className="section-heading" data-reveal><div><p className="eyebrow">PLACES TO MAKE YOUR OWN</p><h2 id="apartments-title">Find your <em>kind of stay.</em></h2></div><a className="text-link" href={booking}>Explore all apartments <ArrowUpRight size={19}/></a></div><div className="apartment-grid">{apartments.map((a,i)=><article key={a.code} className={`apartment-card apartment-card-${i+1}`} data-reveal><a className="apartment-photo-link" href={a.href} aria-label={`View ${a.code}`}><Photo name={a.image} alt={a.alt} sizes="(max-width: 760px) 100vw, 45vw"/><span className="apartment-location">{a.location}</span><span className="card-open"><ArrowUpRight size={23}/></span></a><div className="apartment-title"><p className="eyebrow apartment-code">{a.code}</p><h3><a href={a.href}>{a.name}</a></h3></div><div className="apartment-meta"><span>{a.bedrooms}</span><span>{a.area}</span><span>{a.guests}</span></div><div className="apartment-price"><span><strong>${a.price}</strong> <span>/ night*</span></span><a href={a.href}>View apartment <ArrowUpRight size={17}/></a></div></article>)}</div><div className="collection-bottom"><p>*Indicative nightly rates in USD. Seasonal pricing applies; your final rate is confirmed after selecting dates.</p><a href={booking} className="button button-outline">View the full collection <ArrowRight size={19}/></a></div></section>
   <section className="standards" id="standards" aria-labelledby="standards-title"><div className="standards-inner section-wrap"><div className="standards-visual" data-reveal><Photo name="orbi-detail" alt="A carefully prepared bedroom in a Luxury Apart Hotel apartment"/><div className="standards-image-caption"><span>THE LUXURY APART HOTEL STANDARD</span><span>CARE, IN EVERY DETAIL.</span></div></div><div className="standards-content"><div data-reveal><p className="eyebrow">BEHIND EVERY GOOD STAY</p><h2 id="standards-title">Good service is<br/><em>never an accident.</em></h2><p className="standards-intro">A calm stay begins long before you arrive. We keep the essential work in-house, so care is a process, not just a promise.</p></div><div className="service-list">{services.map(({Icon,title,text})=><article key={title} data-reveal><Icon size={25} strokeWidth={1.25}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></div></section>
   <section className="owners section-wrap" id="owners" aria-labelledby="owners-title"><div className="owners-heading" data-reveal><p className="eyebrow">FOR PROPERTY OWNERS</p><h2 id="owners-title">Your property.<br/><em>Our full attention.</em></h2><p>A place you’re proud to own, in hands you can trust. We take care of the everyday work of hosting, while you keep a clear view of your property.</p><a href={owners} className="button button-dark">Discover property management <ArrowUpRight size={19}/></a></div><div className="owners-image" data-reveal><Photo name="batumi-architecture" alt="Contemporary architecture on Batumi’s waterfront"/><span className="photo-caption">LOCAL KNOWLEDGE. PERSONAL RESPONSIBILITY.</span></div><div className="owner-benefits" data-reveal><article><span className="eyebrow">01 / ONE TEAM</span><h3>Everything, connected.</h3><p>Marketing, reservations, housekeeping and property control, brought together under one management team.</p></article><article><span className="eyebrow">02 / EVERYDAY EASE</span><h3>We handle the hosting.</h3><p>Guest communication and day-to-day operations are taken care of, so each stay needs less of your time.</p></article><article><span className="eyebrow">03 / A CLEAR PICTURE</span><h3>Always in the know.</h3><p>Monthly owner reporting keeps you informed, with transparent communication about your property.</p></article></div><a className="owner-assessment text-link" href={owners}>Let’s talk about your property <ArrowUpRight size={18}/></a></section>
   <section className="finale-scene" ref={finalRef} aria-label="Your next stay in Georgia">
    <div className="finale-pin"><div className="final-cta">
     <picture className="final-picture"><source media="(max-width: 760px)" srcSet="/images/batumi-final-mobile.webp"/><img src="/images/batumi-final.webp" srcSet="/images/batumi-final-medium.webp 1400w, /images/batumi-final.webp 1920w" sizes="100vw" width="1920" height="1280" alt="Palm fronds frame Batumi’s waterfront boulevard and distinctive tower" loading="lazy" decoding="async"/></picture><div className="final-shade"/>
     <div className="final-opening"><p className="eyebrow">A DIFFERENT PACE AWAITS</p><h2>Come for the view.<br/><em>Stay for the feeling.</em></h2></div>
     <div className="final-invite"><p className="eyebrow">YOUR NEXT STAY STARTS HERE</p><h2>Make yourself<br/><em>at home.</em></h2><p className="final-invite-copy">Find your apartment in Batumi or New Gudauri.</p><a className="button button-light" href={booking}>Book an apartment <ArrowUpRight size={20}/></a></div>
     <span className="final-caption">BATUMI & NEW GUDAURI · GEORGIA</span>
    </div></div>
   </section>
  </main>
  <SiteFooter/>
 </>;
}
