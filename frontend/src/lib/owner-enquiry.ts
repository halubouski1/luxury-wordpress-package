export const ownerCities=["Tbilisi","Batumi","Gudauri"] as const;
export const propertyTypes=["Hotel-style apartments","Villas","Hotels"] as const;
export type OwnerEnquiry={name:string;email:string;phone:string;city:string;propertyType:string};
export function validateOwnerContact(data:Pick<OwnerEnquiry,"name"|"email"|"phone">):{field:"name"|"email"|"phone";message:string}|null{
 if(!data.name.trim()||data.name.length>100)return {field:"name",message:"Please enter your name."};
 if(data.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return {field:"email",message:"Please enter a valid email address."};
 const digits=data.phone.replace(/\D/g,"");if(digits.length<7||digits.length>15||!/^\+?[\d\s().-]+$/.test(data.phone))return {field:"phone",message:"Please enter a valid phone number, including your country code."};
 return null;
}
export function validateOwnerEnquiry(data:OwnerEnquiry):{field:keyof OwnerEnquiry;message:string}|null{
 const contactError=validateOwnerContact(data);if(contactError)return contactError;
 if(!ownerCities.some(c=>c===data.city))return {field:"city",message:"Please select a city."};
 if(!propertyTypes.some(c=>c===data.propertyType))return {field:"propertyType",message:"Please select a property type."};
 return null;
}
export function ownerEnquiryMailto(data:OwnerEnquiry){return `mailto:info@luxuryaparthotel.ge?subject=Property%20management%20enquiry&body=${encodeURIComponent(`Hello, I would like to discuss property management.\n\nName: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\nCity: ${data.city}\nProperty type: ${data.propertyType}`)}`;}
