import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
    return (
        <main className="bg-[var(--background-secondary)] w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-[5rem] font-bold">404</h1>
            <p>Página não encontrada</p>
            <Link href="/" className="bg-[var(--primary)] text-[rgb(var(--background))] py-3 px-4 text-[0.9rem] flex items-center justify-center gap-2 rounded-lg mt-2">Voltar para o inicio <ArrowRight size={18} /></Link>
        </main>
    )
}