"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SiteMotion } from "@/components/site-motion";

export function InnerShell({current,children,showFooter=true,immersiveHero=false}:{current:string;children:ReactNode;showFooter?:boolean;immersiveHero?:boolean}){
 const [menuOpen,setMenuOpen]=useState(false),[overImage,setOverImage]=useState(immersiveHero);
 useEffect(()=>{if(!immersiveHero){setOverImage(false);return;}const update=()=>setOverImage(window.scrollY<48);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update);},[immersiveHero]);
 useEffect(()=>{
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const nodes=Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
  }),{threshold:.06});
  nodes.forEach(node=>{if(!reduced.matches&&node.getBoundingClientRect().top>innerHeight)node.classList.add("reveal-pending");observer.observe(node);});
  const showAll=()=>{if(reduced.matches)nodes.forEach(node=>node.classList.add("is-visible"));};
  reduced.addEventListener("change",showAll);
  return()=>{observer.disconnect();reduced.removeEventListener("change",showAll);};
 },[]);
 return <><SiteMotion menuOpen={menuOpen}/><a className="skip-link" href="#content">Skip to content</a><SiteHeader overImage={overImage} current={current} menuOpen={menuOpen} onMenuChange={setMenuOpen}/><main className={`inner-page ${immersiveHero?"inner-page-immersive":""}`} id="top"><div id="content" tabIndex={-1}/>{children}</main>{showFooter&&<SiteFooter/>}</>;
}
