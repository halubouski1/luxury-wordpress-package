import {wpData} from "@/wp-data";
/** Editable article templates. Replace placeholder sections with confirmed offers. */
export type ExperienceService={slug:string;title:string;eyebrow:string;description:string;sections:string[];image?:string;alt?:string};
const seedServices:ExperienceService[]=[
 {slug:"georgia-tours",title:"Georgia Tours",eyebrow:"DISCOVER GEORGIA",description:"Journeys through Georgia, from cities to mountains.",sections:["Overview","Suggested itinerary","What’s included","Good to know"]},
 {slug:"zanzibar-packages",title:"Zanzibar Packages",eyebrow:"HOLIDAYS ABROAD",description:"An Indian Ocean escape, with room to slow down.",image:"travel-zanzibar",alt:"White sand and turquoise water on the Zanzibar coast",sections:["The destination","Your stay","Travel details","Planning your escape"]},
 {slug:"island-escapes",title:"Island Escapes",eyebrow:"HOLIDAYS ABROAD",description:"Quiet shores and a different rhythm of life.",image:"travel-island",alt:"A curving wooden jetty over clear water in the Maldives",sections:["Island inspiration","Choosing your stay","Travel details","Planning your escape"]},
 {slug:"city-breaks",title:"City Breaks",eyebrow:"HOLIDAYS ABROAD",description:"A few days away. A city full of possibilities.",image:"travel-city",alt:"An atmospheric view of Istanbul",sections:["City inspiration","Where to stay","Ideas for your visit","Planning your break"]},
 {slug:"batumi-coast-tour",title:"Batumi & the Black Sea",eyebrow:"GEORGIA TOURS",description:"Coastal days, old-town streets and a sea breeze.",image:"batumi-life",alt:"Palms and walking paths on Batumi Boulevard",sections:["The experience","Suggested route","Practical details","Planning your visit"]},
 {slug:"tbilisi-city-tour",title:"A Taste of Tbilisi",eyebrow:"GEORGIA TOURS",description:"A closer look at the capital, one neighbourhood at a time.",image:"tbilisi-dusk",alt:"Tbilisi and the Mtatsminda tower at sunset",sections:["The experience","Suggested route","Practical details","Planning your visit"]},
 {slug:"gudauri-mountain-tour",title:"Into the Caucasus",eyebrow:"GEORGIA TOURS",description:"Mountain landscapes and a change of perspective.",image:"gudauri-dusk",alt:"Snow-covered Caucasus mountains at sunset in Gudauri",sections:["The experience","Suggested route","Seasonal considerations","Planning your visit"]},
 {slug:"custom-trips",title:"Your Journey, Your Way",eyebrow:"CUSTOM TRIP",description:"Start with an idea. Shape the journey around you.",image:"batumi-garden",alt:"Green Cape and the Black Sea seen from Batumi Botanical Garden",sections:["Your travel idea","Your itinerary","Your preferences","Planning together"]},
 {slug:"sea-and-mountains",title:"From Sea to Mountains",eyebrow:"CUSTOM TRIP",description:"Bring two sides of Georgia into one personal itinerary.",image:"gudauri-mountains",alt:"A wide mountain panorama in Gudauri",sections:["Your travel idea","Connecting destinations","Your preferences","Planning together"]},
 {slug:"private-driver",title:"Private Driver",eyebrow:"CUSTOM TRIP",description:"Your day, your route, your own rhythm.",image:"batumi-coast",alt:"Batumi’s coastline and waterfront boulevard",sections:["Service overview","Routes & duration","Vehicle options","Booking details"]},
 {slug:"airport-transfers",title:"Airport Transfers",eyebrow:"CONCIERGE SERVICE",description:"A considered start and finish to your journey.",image:"batumi-architecture",alt:"Contemporary architecture beside Batumi’s waterfront",sections:["Transfer overview","Routes & airports","Vehicle options","Booking details"]},
 {slug:"concierge",title:"Everyday Concierge",eyebrow:"CONCIERGE SERVICE",description:"A little help with the details of your stay.",image:"orbi-detail",alt:"A prepared apartment bedroom with a sea-view balcony",sections:["Service overview","How we can help","How it works","Good to know"]},
 {slug:"special-occasions",title:"Special Occasions",eyebrow:"CONCIERGE SERVICE",description:"Make space for a moment worth remembering.",image:"batumi-evening",alt:"Warm evening light over Batumi and the Black Sea",sections:["Your occasion","Your ideas","Personal details","Planning together"]}
];
const seedCollections=[
 {id:"holidays-abroad",title:"Holidays Abroad",description:"Somewhere new. A different kind of escape.",slugs:["zanzibar-packages","island-escapes","city-breaks"]},
 {id:"georgia-tours",title:"Georgia Tours",description:"From the Black Sea to the heart of the Caucasus.",slugs:["batumi-coast-tour","tbilisi-city-tour","gudauri-mountain-tour"]},
 {id:"custom-trip",title:"Custom Trip",description:"Journeys shaped around your own ideas.",slugs:["custom-trips","sea-and-mountains","private-driver"]},
 {id:"concierge-service",title:"Concierge Service",description:"Thoughtful help with the details along the way.",slugs:["airport-transfers","concierge","special-occasions"]}
];

export const experienceServices:ExperienceService[]=wpData?wpData.experiences:seedServices;
export const experienceCollections:typeof seedCollections=wpData?wpData.collections:seedCollections;
