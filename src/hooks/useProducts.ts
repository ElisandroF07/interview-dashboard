import RegisterProductFormSchema, { RegisterProductFormType } from "@/models/registerProductFormModel";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Product } from "@/interfaces/product";

export default function useProducts() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const [updateModalOpened, setUpdateModalOpened] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        id: 0
    })

    const { register: registerProduct, handleSubmit: handleSubmitProduct, formState: { errors: errorsProduct } } = useForm<RegisterProductFormType>({
        resolver: zodResolver(RegisterProductFormSchema)
    })

    async function createProduct(data: RegisterProductFormType) {
        setIsLoading(true)
        try {
            const response = await api.post('/products/create-product', {
                name: data.name,
                description: data.description,
                price: parseInt(data.price),
                stock: parseInt(data.stock)
            })
            toast.success('Producto criado com sucesso!')
            setIsModalOpened(false)
        }
        catch (error) {
            console.log(`Erro ao cadastrar produto: ${error}`)
            toast.success('Ocorreu um erro ao processar a sua solicitação!')
        }
        finally {
            setIsLoading(false)
        }
    }

    async function updateProduct(id: number, product: Product) {
        setIsLoading(true)
        try {
            const response = await api.patch(`/products/update-product/${id}`, {
                name: product.name,
                description: product.description,
                price: parseInt(product.price.toString()),
                stock: parseInt(product.stock.toString())
            })
            toast.success('Producto atualizado com sucesso!')
            setUpdateModalOpened(false)
        }
        catch (error) {
            console.log(`Erro ao atualizar produto: ${error}`)
            toast.error('Ocorreu um erro ao processar a sua solicitação!')
        }
        finally {
            setIsLoading(false)
        }
    }

    const deleteProduct = async (id: number) => {
        setIsLoading(true)
        try {
            api.delete(`/products/delete-product/${id}`)
            toast.success('Produto eliminado com sucesso!')
        }
        catch (error) {
            console.log(`Erro ao deletar o produto: ${error}`)
        }
        finally {
            setIsLoading(false)
        }
    }

    return { registerProduct, handleSubmitProduct, deleteProduct, updateProduct, errorsProduct, createProduct, isLoading, selectedProduct, setSelectedProduct, setIsModalOpened, isModalOpened, setUpdateModalOpened, updateModalOpened }
}