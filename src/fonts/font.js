import { DM_Sans, Playfair_Display, Arimo } from "next/font/google";


export const playfair_display = Playfair_Display({
    weight:["400","500","600","700","800","900"],
    subsets:["latin"],
    display:"swap",
    variable:"--font-playfair",
    style:["normal","italic"]
})
export const dmsans = DM_Sans({
    weight:["400","500","600","700","800","900"],
    subsets:["latin"],
    display:"swap",
    variable:"--font-dmsans"
})
export const arimo = Arimo({
    weight:["400","500","600","700"],
    subsets:["latin"],
    display:"swap",
    variable:"--font-arimo"
})