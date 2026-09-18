import { ownerCities,propertyTypes,validateOwnerContact } from "@/lib/owner-enquiry";
export const assessmentServices=[
 {id:"management",title:"Property & rental management",description:"Help with hosting and the everyday care of your property."},
 {id:"sale",title:"Sell my property",description:"Discuss your property, your plans and the next steps for a sale."},
 {id:"assessment",title:"Property assessment",description:"Understand your property’s condition and potential."},
 {id:"investment",title:"Investment consultation",description:"Explore a property search around your goals and preferences."}
] as const;
export const areaOptions=["Under 35 m²","35–60 m²","60–100 m²","100–200 m²","200–500 m²","Over 500 m²","Not sure yet"];
export type DetailField={key:string;label:string;options?:readonly string[];placeholder?:string;optional?:boolean};
const condition:DetailField={key:"condition",label:"Property condition",options:["Ready to use","Furnished — needs preparation","Renovation needed","Under construction"]};
const bedrooms:DetailField={key:"bedrooms",label:"Bedrooms / units",options:["Studio","1 bedroom","2 bedrooms","3 bedrooms","4+ bedrooms","Multiple units"]};
export const serviceDetails:Record<string,DetailField[]>={
 management:[condition,bedrooms,{key:"rentalStatus",label:"Current rental status",options:["Not rented yet","Short-term rentals","Long-term rental","Managed by another company"]},{key:"timing",label:"When would you like to start?",options:["As soon as possible","Within 1–3 months","Within 3–6 months","Exploring options"]}],
 sale:[condition,bedrooms,{key:"timing",label:"When would you like to sell?",options:["As soon as possible","Within 3–6 months","Within 6–12 months","Exploring options"]},{key:"askingPrice",label:"Target asking price (optional)",placeholder:"Amount and currency",optional:true}],
 assessment:[condition,{key:"purpose",label:"What would you like to understand?",options:["Market value","Rental potential","Readiness for a sale","Renovation needs"]},{key:"occupancy",label:"Current occupancy",options:["Vacant","Owner-occupied","Occupied by tenants","Under construction"]},{key:"timing",label:"Preferred timing",options:["As soon as possible","Within a month","Within 3 months","No fixed date"]}],
 investment:[{key:"budget",label:"Indicative purchase budget",options:["Under USD 100,000","USD 100,000–250,000","USD 250,000–500,000","Over USD 500,000","Prefer to discuss"]},{key:"goal",label:"Your main goal",options:["Rental income","Personal use","Capital growth","Mixed personal and rental use"]},{key:"timing",label:"Purchase timeframe",options:["Within 3 months","3–6 months","6–12 months","Exploring options"]}]
};
export type PropertyQuizData={service:string;country:string;otherCountry:string;city:string;otherCity:string;propertyType:string;area:string;details:Record<string,string>;notes:string;name:string;email:string;phone:string;contactMethod:string};
export const initialQuizData:PropertyQuizData={service:"",country:"Georgia",otherCountry:"",city:"",otherCity:"",propertyType:"",area:"",details:{},notes:"",name:"",email:"",phone:"",contactMethod:"Email"};
export type QuizError={field:string;message:string};
export function validateQuizStep(step:number,data:PropertyQuizData):QuizError|null{
 if(step===0&&!assessmentServices.some(s=>s.id===data.service))return {field:"service",message:"Please choose the service you are interested in."};
 if(step===1){
  if(!["Georgia","Other"].includes(data.country))return {field:"country",message:"Please select a country."};
  if(data.country==="Other"){
   if(data.otherCountry.trim().length<2||data.otherCountry.length>80)return {field:"otherCountry",message:"Please enter the country."};
   if(data.otherCity.trim().length<2||data.otherCity.length>100)return {field:"otherCity",message:"Please enter the city or region."};
  }else if(!ownerCities.some(c=>c===data.city))return {field:"city",message:"Please choose a city."};
  if(!propertyTypes.some(t=>t===data.propertyType))return {field:"propertyType",message:"Please choose a property type."};
  if(!areaOptions.includes(data.area))return {field:"area",message:"Please select an approximate area."};
 }
 if(step===2){
  if(!serviceDetails[data.service])return {field:"service",message:"Please choose a service first."};
  for(const f of serviceDetails[data.service]){const value=data.details[f.key]||"";if(!f.optional&&(!value||(f.options&&!f.options.includes(value))))return {field:`detail-${f.key}`,message:`Please complete: ${f.label.toLowerCase()}.`};if(value.length>100)return {field:`detail-${f.key}`,message:"Please keep this answer under 100 characters."};}
  if(data.notes.length>1500)return {field:"notes",message:"Please keep your notes under 1,500 characters."};
 }
 if(step===3){const error=validateOwnerContact(data);if(error)return error;if(!["Email","Phone"].includes(data.contactMethod))return {field:"contactMethod",message:"Please choose a contact preference."};}
 return null;
}
export function quizLocation(data:PropertyQuizData){return data.country==="Georgia"?`${data.city}, Georgia`:`${data.otherCity.trim()}, ${data.otherCountry.trim()}`;}
export function quizMailto(data:PropertyQuizData){
 const service=assessmentServices.find(s=>s.id===data.service)?.title||"Property enquiry";
 const details=(serviceDetails[data.service]||[]).filter(f=>data.details[f.key]).map(f=>`${f.label}: ${data.details[f.key]}`).join("\n");
 const body=`Hello, I would like to request a professional property consultation.\n\nService: ${service}\nLocation: ${quizLocation(data)}\nProperty type: ${data.propertyType}\n${data.service==="investment"?"Preferred area":"Total area"}: ${data.area}\n\n${details}${data.notes.trim()?`\nAdditional notes: ${data.notes.trim()}`:""}\n\nName: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\nPreferred contact: ${data.contactMethod}`;
 return `mailto:info@luxuryaparthotel.ge?subject=${encodeURIComponent(service+" enquiry")}&body=${encodeURIComponent(body)}`;
}
