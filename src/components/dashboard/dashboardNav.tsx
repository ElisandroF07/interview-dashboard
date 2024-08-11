'use client'

import logo from '@/assets/images/logo.png'
import Image from "next/image";
import Link from "next/link";
import { Headset, Box, LogOut } from "lucide-react";
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { usePathname } from 'next/navigation';

export default function DashbaordNav() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const pathname = usePathname()

    const menuData = [
        {
            label: 'Produtos',
            href: '/dashboard',
            icon: <Box strokeWidth={1.2} size={18} />
        },
        {
            label: 'Contacto',
            href: '/dashboard/contact',
            icon: <Headset size={18} strokeWidth={1.2} />
        },
    ]

    async function handleLogOut() {
        try {
            await signOut()
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }

    }

    return (
        <nav className="w-[240px] h-full rounded-br-[18px] bg-[rgb(var(--background))] px-3 py-3 pt-6">
            <Image src={logo} alt="T-ALPHA Logo" className="w-[150px]" />
            <p className="mt-4 text-[0.7rem] font-medium opacity-60 relative">Menu</p>
            <ul className="flex flex-col mt-2">
                {menuData.map((item, _index) => (
                    <li key={_index}>
                        <Link data-focused={pathname === item.href} href={item.href} className="w-full h-[45px] text-[rgb(var(--foreground))] hover:gap-3 transition-all duration-300 rounded-[12px] flex items-center justify-start gap-2 px-4 text-[0.7rem]">{item.icon}{item.label}</Link>
                    </li>
                ))}
            </ul>
            <button disabled={isLoading} onClick={handleLogOut} className="w-[218px] h-[45px] bg-zinc-200 hover:bg-red-100 hover:text-red-600 hover:gap-3 transition-all duration-300 rounded-[12px] flex items-center justify-start gap-2 px-6 text-[0.8rem] absolute bottom-2 left-2.5">{isLoading ? <TailSpin width={18} color='rgb(var(--foreground))' /> : <><LogOut size={18} strokeWidth={1.2} />Elisandro Franco</>}</button>
        </nav>
    )
}