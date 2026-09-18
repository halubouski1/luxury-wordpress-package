"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/** Corrected wordmark reuses the supplied U glyph to preserve the original typeface. */
export function Wordmark() {
 return <img className="wordmark-image" src="/images/luxury-wordmark.svg" width="1269" height="398" alt="" aria-hidden="true" decoding="async"/>;
}

export function SiteMotion({menuOpen}:{menuOpen:boolean}) {
 const lenisRef=useRef<Lenis|null>(null);
 const menuRef=useRef(menuOpen);
 menuRef.current=menuOpen;

 useEffect(()=>{
  const root=document.documentElement;
  const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
  const intro=document.querySelector<HTMLElement>(".arrival");
  const main=document.querySelector<HTMLElement>("main");
  const footer=document.querySelector<HTMLElement>(".site-footer");
  let disposed=false,anchorFrame=0;
  const timers:number[]=[];
  const delay=(ms:number)=>new Promise<void>(resolve=>timers.push(window.setTimeout(resolve,ms)));
  const finishIntro=()=>{
   delete root.dataset.intro;
   if(main)main.inert=false;
   if(footer)footer.inert=false;
   if(!menuRef.current)lenisRef.current?.start();
  };
  const configureScroll=()=>{
   lenisRef.current?.destroy();
   lenisRef.current=null;
   if(preference.matches){finishIntro();return;}
   lenisRef.current=new Lenis({
    autoRaf:true, smoothWheel:true, syncTouch:false,
    lerp:.05, wheelMultiplier:1, anchors:false,
    stopInertiaOnNavigate:true,
   });
   if(root.dataset.intro||menuRef.current)lenisRef.current.stop();
  };
  configureScroll();
  if(root.dataset.intro){
   if(main)main.inert=true;
   if(footer)footer.inert=true;
   const hero=document.querySelector<HTMLImageElement>(".hero-picture img");
   const logo=document.querySelector<HTMLImageElement>(".arrival .wordmark-image");
   // Show the small mark while the two first-screen assets decode, with a bounded wait.
   const ready=Promise.all([hero,logo].map(img=>img?.decode().catch(()=>{})??Promise.resolve()));
   void Promise.all([Promise.race([ready,delay(1400)]),delay(800)]).then(()=>{
    if(!disposed&&root.dataset.intro==="waiting")root.dataset.intro="revealing";
   });
   timers.push(window.setTimeout(finishIntro,4500));
  }
  const onAnimationEnd=(event:AnimationEvent)=>{
   if(event.animationName==="arrival-complete")finishIntro();
  };
  const onKeyDown=(event:KeyboardEvent)=>{
   if(["Tab","Escape","ArrowDown","ArrowUp","PageDown","PageUp","Home","End"," "].includes(event.key)){
    if(root.dataset.intro)finishIntro();
    lenisRef.current?.scrollTo(window.scrollY,{immediate:true});
   }
  };
  const onPageShow=(event:PageTransitionEvent)=>{
   if(event.persisted){finishIntro();lenisRef.current?.resize();}
  };
  const onAnchorClick=(event:MouseEvent)=>{
   const link=(event.target as Element|null)?.closest<HTMLAnchorElement>('a[href^="#"]');
   if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute("download")||link.target==="_blank")return;
   const hash=link.getAttribute("href");
   if(!hash||hash==="#")return;
   const target=document.getElementById(decodeURIComponent(hash.slice(1)));
   if(!target)return;
   if(root.dataset.intro)finishIntro();
   const lenis=lenisRef.current;
   if(!lenis)return;
   event.preventDefault();
   cancelAnimationFrame(anchorFrame);
   // Let the navigation drawer close before scrolling the document behind it.
   anchorFrame=requestAnimationFrame(()=>{
    lenis.start();
    if(location.hash!==hash)history.pushState(null,"",hash);
    const focusTarget=()=>{
     const addedTabIndex=!target.hasAttribute("tabindex");
     if(addedTabIndex)target.setAttribute("tabindex","-1");
     target.focus({preventScroll:true});
     if(addedTabIndex)target.addEventListener("blur",()=>target.removeAttribute("tabindex"),{once:true});
    };
    lenis.scrollTo(target,{immediate:link.classList.contains("skip-link"),onComplete:focusTarget});
   });
  };
  intro?.addEventListener("animationend",onAnimationEnd);
  preference.addEventListener("change",configureScroll);
  window.addEventListener("keydown",onKeyDown,true);
  window.addEventListener("pageshow",onPageShow);
  window.addEventListener("luxury:intro-finished",finishIntro);
  document.addEventListener("click",onAnchorClick);
  return()=>{
   disposed=true;timers.forEach(clearTimeout);cancelAnimationFrame(anchorFrame);
   intro?.removeEventListener("animationend",onAnimationEnd);
   preference.removeEventListener("change",configureScroll);
   window.removeEventListener("keydown",onKeyDown,true);
   window.removeEventListener("pageshow",onPageShow);
   window.removeEventListener("luxury:intro-finished",finishIntro);
   document.removeEventListener("click",onAnchorClick);
   lenisRef.current?.destroy();lenisRef.current=null;
   if(main)main.inert=false;
   if(footer)footer.inert=false;
  };
 },[]);

 useEffect(()=>{
  if(menuOpen||document.documentElement.dataset.intro)lenisRef.current?.stop();
  else lenisRef.current?.start();
 },[menuOpen]);

 return <div className="arrival" aria-hidden="true">
  <div className="arrival-shutters">{Array.from({length:7},(_,i)=><span className={`arrival-shutter shutter-${i}`} key={i}/>)}</div>
  <div className="arrival-mark"><Wordmark/></div>
 </div>;
}
