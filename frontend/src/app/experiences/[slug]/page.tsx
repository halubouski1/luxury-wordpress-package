import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { experiences } from "@/lib/editorial";
import { experienceServices } from "@/lib/experience-services";
import { ExperienceTemplate } from "@/components/experience-template";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return [...experienceServices,...experiences].map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const service=experienceServices.find(a=>a.slug===slug);if(service)return {title:`${service.title} | Luxury Apart Hotel`,description:service.description};const article=experiences.find(a=>a.slug===slug);return {title:article?`${article.title} | Luxury Apart Hotel`:"Experience not found",description:article?.summary};}
export default async function ExperiencePage({params}:Props){const {slug}=await params;const service=experienceServices.find(a=>a.slug===slug);if(service)return <ExperienceTemplate service={service}/>;const article=experiences.find(a=>a.slug===slug);if(!article)notFound();return <ArticlePage experience article={article} related={experiences.filter(a=>a.slug!==slug).slice(0,2)}/>;}
