import herosvg from "@/assets/svgs/hero.svg"
import { Github, Linkedin, LinkedinIcon, Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <Image src={herosvg} alt="hero" className="w-[200px]"/>
            <h1 className="text-[#333] text-[1.3rem] font-semibold mt-2">Entre em contato</h1>
            <p className="text-[0.75rem] opacity-70">elisandrofranco2020@gmail.com</p>
            <ul className="w-max flex mt-4 gap-3">
                <li>
                    <a href={'https://www.linkedin.com/in/elisandrof07'} target="_blank" rel="external" className="p-2.5 bg-white rounded-[12px] hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 border-[1px] border-solid text-[#222] flex items-center justify-center" ><LinkedinIcon strokeWidth={1.2} size={20}/></a>
                </li>
                <li>
                    <a href={'mailto:elisandrofranco2020@gmail.com'} target="_blank" rel="external" className="p-2.5 bg-white rounded-[12px] hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 border-[1px] border-solid text-[#222] flex items-center justify-center" ><Mail strokeWidth={1.2} size={20}/></a>
                </li>
                <li>
                    <a href={'https://wa.link/ow0jca'} target="_blank" rel="external" className="p-2.5 bg-white rounded-[12px] hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 border-[1px] border-solid text-[#222] flex items-center justify-center" ><Phone strokeWidth={1.2} size={20}/></a>
                </li>
                <li>
                    <a href={'https://github.com/elisandrof07'} target="_blank" rel="external" className="p-2.5 bg-white rounded-[12px] hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 border-[1px] border-solid text-[#222] flex items-center justify-center" ><Github strokeWidth={1.2} size={20}/></a>
                </li>
            </ul>
        </div>
    )
}