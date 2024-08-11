import { z } from 'zod'

const RegisterProductFormSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(1),
    price: z.string().min(1),
    stock: z.string().min(1)
})

type RegisterProductFormType = z.infer<typeof RegisterProductFormSchema>

export default RegisterProductFormSchema;
export type { RegisterProductFormType }