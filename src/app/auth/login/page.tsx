'use client'

import Image from "next/image";
import logo from '@/assets/images/logo-white.png'
import InputField from "@/components/shared/inputField";
import ButtonComponent from "@/components/shared/buttonComponent";
import useAuth from "@/hooks/useAuth";
import '@/styles/login.css'

export default function Login() {

    const { errors, register, handleSubmit, signIn, isLoading } = useAuth()

    return (
        <main className="bg-[var(--background-secondary)] w-full h-full flex flex-col items-center justify-center">
            <section className="flex items-center justify-center rounded-[18px] p-4 bg-[rgb(var(--background))] shadow-sm">
                <div className=" card_left w-[0px] md:w-[400px] h-[550px] rounded-[15px] pl-0 md:pl-4 relative flex flex-col pb-[20px] items-start justify-end transition-all duration-300">
                    <Image src={logo} alt="logo" className="mb-16 w-[150px] sm:w-[150px] absolute top-4 left-4 pointer-events-none" />
                </div>
                <div className="flex flex-col items-left justify-center px-6 h-full">
                    <h1 className="text-[1.7rem] text-[var(--primary)] font-semibold">Bem vindo,</h1>
                    <p className="text-[0.8rem] font-light opacity-70">Insira as suas credenciais para continuar</p>
                    <form onSubmit={handleSubmit(signIn)} className="w-max h-max bg-[rgb(var(--background))] flex flex-col items-center justify-center gap-3 py-7 rounded-lg">
                        <InputField haveError={!!errors.taxNumber} {...register('taxNumber')} id="CPF ou CNPJ" label="CPF ou CNPJ" type="text" placeholder="nome@dominio.extensao" />
                        <InputField haveError={!!errors.password} {...register('password')} id="password" label="Senha" type="password" placeholder="*********" />
                        <ButtonComponent isLoading={isLoading}>Entrar</ButtonComponent>
                    </form>
                </div>
            </section>
        </main>
    )
}