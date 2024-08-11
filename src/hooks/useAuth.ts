import LoginFormSchema, { LoginFormType } from "@/models/loginForm.model";
import api from "@/services/api"; // Este import pode não ser necessário se não for usado aqui
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function useAuth() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema)
    });

    const signIn = async (data: LoginFormType) => {
        setIsLoading(true);
        try {
            const result = await nextAuthSignIn('credentials', { 
                taxNumber: data.taxNumber,
                password: data.password, 
                redirect: true,
            });

            if (result?.error) {
                toast.error('Credenciais inválidas!', { description: 'Verifique os dados inseridos' });
            } else {
                redirect('/');
            }
        } catch (error) {
           console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    return { register, handleSubmit, errors, signIn, isLoading };
}
