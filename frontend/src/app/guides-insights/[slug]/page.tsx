import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { guides } from "@/lib/editorial";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return guides.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const article=guides.find(a=>a.slug===slug);return {title:article?`${article.title} | Luxury Apart Hotel`:"Guide not found",description:article?.summary};}
export default async function GuidePage({params}:Props){const {slug}=await params;const article=guides.find(a=>a.slug===slug);if(!article)notFound();return <ArticlePage article={article} related={guides.filter(a=>a.slug!==slug).slice(0,2)}/>;}
