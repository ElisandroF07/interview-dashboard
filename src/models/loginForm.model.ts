import { z } from 'zod'

const LoginFormSchema = z.object({
    taxNumber: z.string().min(1),
    password: z.string().min(1)
})

type LoginFormType = z.infer<typeof LoginFormSchema>

export default LoginFormSchema;
export type { LoginFormType }