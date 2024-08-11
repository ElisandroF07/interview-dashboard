import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {

    const session = await getServerSession()

    if (session) redirect('/dashboard')

    return (
        <>
            {children}
            <footer className="w-full flex items-center justify-center absolute bottom-3 left-0">
                <p className="text-[0.8rem] opacity-70">Developed by <Link className="hover:text-cyan-600 transition-color duration-300" href={'mailto:elisandrofranco2020@gmail.com'}>@Elisandro Franco</Link></p>
            </footer>
        </>
    )
}