import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { InnerShell } from "@/components/inner-shell";
import { EditorialImage } from "@/components/editorial-image";
import { EditorialCard } from "@/components/editorial-cards";
import type { EditorialArticle } from "@/lib/editorial";
export function ArticlePage({article,related,experience=false}:{article:EditorialArticle;related:EditorialArticle[];experience?:boolean}){
 const base=experience?"experiences":"guides-insights";
 return <InnerShell current={`/${base}/`}><article className={`reading-page ${experience?"experience-detail":""}`}>
  <header className="article-heading section-wrap"><a className="article-back" href={`/${base}/`}><ArrowLeft size={16}/>{experience?"All experiences":"Guides & Insights"}</a><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="article-deck">{article.summary}</p><div className="article-byline"><span>Luxury Apart Hotel</span><span>{experience?"A SELF-GUIDED OUTING":"LOCAL KNOWLEDGE"}</span></div></header>
  <figure className="article-cover"><EditorialImage name={article.image} alt={article.alt} priority/><figcaption>{article.alt}</figcaption></figure>
  <div className="reading-layout section-wrap"><aside className="reading-nav"><p className="eyebrow">{experience?"YOUR OUTING":"IN THIS GUIDE"}</p><nav aria-label="Article contents">{article.sections.map((s,i)=><a key={s.id} href={`#${s.id}`}><span>0{i+1}</span>{s.title}</a>)}</nav>{article.map&&<a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(article.map)}`} target="_blank" rel="noopener noreferrer"><MapPin size={17}/>Open in Maps<ArrowUpRight size={16}/></a>}</aside>
   <div className="reading-body"><p className="reading-lead">{article.intro}</p>{article.sections.map((section,i)=><section id={section.id} key={section.id} data-reveal><span className="eyebrow reading-number">0{i+1}</span><h2>{section.title}</h2>{section.paragraphs.map(text=><p key={text}>{text}</p>)}{section.list&&<ul>{section.list.map(text=><li key={text}>{text}</li>)}</ul>}</section>)}
   {article.note&&<p className="reading-note">{article.note}</p>}<div className="article-source"><span>Further information</span><a href={article.source} target="_blank" rel="noopener noreferrer">{article.sourceLabel}<ArrowUpRight size={15}/></a></div>
   <div className="article-stay"><p className="eyebrow">MAKE YOURSELF AT HOME</p><h2>A place to come back to.</h2><p>Explore our apartments in Batumi and New Gudauri.</p><a className="button" href="https://luxuryaparthotel.ge/apartments/">Book an apartment<ArrowUpRight size={18}/></a></div></div>
  </div></article>
  <section className="related-section section-wrap"><div className="section-heading"><div><p className="eyebrow">A LITTLE MORE INSPIRATION</p><h2>{experience?"Keep exploring.":"Keep reading."}</h2></div><a className="text-link" href={`/${base}/`}>{experience?"All experiences":"All guides"}<ArrowUpRight size={18}/></a></div><div className="related-grid">{related.map(a=><EditorialCard key={a.slug} article={a} kind={base}/>)}</div></section>
 </InnerShell>;
}
