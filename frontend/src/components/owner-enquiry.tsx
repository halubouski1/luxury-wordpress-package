"use client";
import { useRef,useState,type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from "@/components/ui/select";
import { ownerCities,propertyTypes,validateOwnerEnquiry,ownerEnquiryMailto,type OwnerEnquiry } from "@/lib/owner-enquiry";
export function OwnerEnquiryForm(){
 const formRef=useRef<HTMLFormElement>(null),[city,setCity]=useState(""),[propertyType,setPropertyType]=useState("");
 const [error,setError]=useState<ReturnType<typeof validateOwnerEnquiry>>(null),[ready,setReady]=useState(false);
 const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const f=new FormData(event.currentTarget);const data:OwnerEnquiry={name:String(f.get("name")??"").trim(),email:String(f.get("email")??"").trim(),phone:String(f.get("phone")??"").trim(),city,propertyType};const invalid=validateOwnerEnquiry(data);setError(invalid);setReady(false);if(invalid){formRef.current?.querySelector<HTMLElement>(`#owner-${invalid.field}`)?.focus();return;}window.location.href=ownerEnquiryMailto(data);setReady(true);};
 return <form ref={formRef} className="owner-enquiry-form" onSubmit={submit} noValidate aria-label="Property management enquiry">
  <p className="eyebrow">PROPERTY MANAGEMENT ENQUIRY</p><h3>Tell us about<br/><em>your property.</em></h3>
  <div className="owner-form-fields">
   <label className="owner-field owner-field-wide" htmlFor="owner-name">Name<input id="owner-name" name="name" autoComplete="name" placeholder="Your full name" maxLength={100} required aria-invalid={error?.field==="name"} aria-describedby={error?.field==="name"?"owner-form-error":undefined}/></label>
   <label className="owner-field" htmlFor="owner-email">Email<input id="owner-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required aria-invalid={error?.field==="email"} aria-describedby={error?.field==="email"?"owner-form-error":undefined}/></label>
   <label className="owner-field" htmlFor="owner-phone">Phone<input id="owner-phone" name="phone" type="tel" autoComplete="tel" placeholder="+995 ..." maxLength={30} required aria-invalid={error?.field==="phone"} aria-describedby={error?.field==="phone"?"owner-form-error":undefined}/></label>
   <div className="owner-field"><label htmlFor="owner-city">City</label><Select name="city" value={city} onValueChange={setCity}><SelectTrigger id="owner-city" className="owner-select" aria-required="true" aria-invalid={error?.field==="city"} aria-describedby={error?.field==="city"?"owner-form-error":undefined}><SelectValue placeholder="Select a city"/></SelectTrigger><SelectContent className="owner-select-options" position="popper" data-lenis-prevent>{ownerCities.map(value=><SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div>
   <div className="owner-field"><label htmlFor="owner-propertyType">Property type</label><Select name="propertyType" value={propertyType} onValueChange={setPropertyType}><SelectTrigger id="owner-propertyType" className="owner-select" aria-required="true" aria-invalid={error?.field==="propertyType"} aria-describedby={error?.field==="propertyType"?"owner-form-error":undefined}><SelectValue placeholder="Select property type"/></SelectTrigger><SelectContent className="owner-select-options" position="popper" data-lenis-prevent>{propertyTypes.map(value=><SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div>
  </div>
  {error&&<p id="owner-form-error" className="owner-form-error" role="alert">{error.message}</p>}
  <button type="submit" className="button owner-form-submit">Continue by email<ArrowUpRight size={19}/></button>
  <p className="owner-form-note" role={ready?"status":undefined}>{ready?"Your email app should open with these details. Send the email there to complete your request.":"Opens your email app with your details. All fields are required."}</p>
  <a className="owner-form-direct" href="mailto:info@luxuryaparthotel.ge">info@luxuryaparthotel.ge</a>
 </form>;
}
