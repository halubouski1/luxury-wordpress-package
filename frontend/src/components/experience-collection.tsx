"use client";
import {useEffect,useState,type ReactNode} from "react";
import {ArrowUpRight} from "lucide-react";
import {Carousel,CarouselContent,CarouselItem,CarouselPrevious,CarouselNext,type CarouselApi} from "@/components/ui/carousel";
import {EditorialImage} from "@/components/editorial-image";
import type {ExperienceService} from "@/lib/experience-services";
type CollectionArticle=Pick<ExperienceService,"slug"|"title"|"eyebrow"|"description"|"image"|"alt">;
export function ExperienceCollection({id,title,description,index=0,articles,eyebrow,heading,basePath="experiences"}:{id:string;title:string;description:string;index?:number;articles:CollectionArticle[];eyebrow?:string;heading?:ReactNode;basePath?:"experiences"|"guides-insights"}){
 const [api,setApi]=useState<CarouselApi>(),[position,setPosition]=useState(0),[count,setCount]=useState(1),[reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(mq.matches);update();mq.addEventListener("change",update);return()=>mq.removeEventListener("change",update);},[]);
 useEffect(()=>{if(!api)return;const update=()=>{setPosition(api.selectedScrollSnap());setCount(api.scrollSnapList().length);};update();api.on("select",update);api.on("reInit",update);return()=>{api.off("select",update);api.off("reInit",update);};},[api]);
 return <section className="experience-collection" id={id} aria-labelledby={`${id}-title`}>
  <Carousel setApi={setApi} opts={{align:"start",containScroll:"trimSnaps",slidesToScroll:1,duration:reduced?0:25}} aria-labelledby={`${id}-title`}>
   <div className="collection-heading"><div><p className="eyebrow">{eyebrow||`0${index+1} / THE COLLECTION`}</p><h2 id={`${id}-title`}>{heading||title}</h2><p>{description}</p></div><div className="collection-arrows"><CarouselPrevious aria-label={`Previous ${title} articles`}/><CarouselNext aria-label={`Next ${title} articles`}/></div></div>
   {articles.length===0&&<p className="wp-empty">New stories are on their way.</p>}
   <CarouselContent className="collection-track">{articles.map((article,i)=><CarouselItem className="collection-slide" key={article.slug} aria-label={`${i+1} of ${articles.length}`}><a className="experience-article-card" href={`/${basePath}/${article.slug}/`}><figure><EditorialImage name={article.image!} alt={article.alt!} sizes="(max-width:699px) 85vw, (max-width:1000px) 55vw, 40vw"/></figure><div className="experience-card-copy"><p className="eyebrow">{article.eyebrow}</p><h3>{article.title}</h3><p className="experience-card-description">{article.description}</p><span className="experience-card-link">{basePath==="guides-insights"?"Read the guide":"Read more"}<ArrowUpRight size={20}/></span></div></a></CarouselItem>)}</CarouselContent>
   <div className="collection-pagination"><input className="collection-position-range" type="range" min={0} max={Math.max(1,count-1)} step={1} value={position} disabled={count<2} aria-label={`Browse ${title} articles`} aria-valuetext={`Position ${position+1} of ${count}`} onChange={event=>api?.scrollTo(Number(event.target.value),reduced)}/><span aria-live="polite" aria-atomic="true">{String(position+1).padStart(2,"0")} / {String(count).padStart(2,"0")}</span></div>
  </Carousel>
 </section>;
}
