import { ArrowUpRight } from "lucide-react";
import { EditorialImage } from "@/components/editorial-image";
import type { EditorialArticle } from "@/lib/editorial";
export function EditorialCard({article,kind="guides-insights",number}:{article:EditorialArticle;kind?:"guides-insights"|"experiences";number?:number}){
 const href=`/${kind}/${article.slug}/`;
 return <article className="editorial-card" data-reveal><a href={href} className="editorial-card-image" aria-label={`Read ${article.title}`}><EditorialImage name={article.image} alt={article.alt} sizes="(max-width:700px) 100vw, 42vw"/><span className="card-open"><ArrowUpRight size={22}/></span></a><div className="editorial-card-meta"><span>{article.category}</span>{number!==undefined&&<span>0{number}</span>}</div><h3><a href={href}>{article.title}</a></h3><p>{article.summary}</p><a className="text-link" href={href}>{kind==="experiences"?"Explore the experience":"Read the guide"}<ArrowUpRight size={17}/></a></article>;
}
