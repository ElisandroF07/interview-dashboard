import useDashboard from "@/hooks/useDashboard";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/interfaces/product";
import api from "@/services/api";
import { Pencil, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface IProps {
    setUpdateModalOpened: Dispatch<SetStateAction<boolean>>
    setSelectedProduct: Dispatch<SetStateAction<Product>>
}

export default function CardViewProducts({ setUpdateModalOpened, setSelectedProduct }: IProps) {

    const { data } = useDashboard()
    const { deleteProduct } = useProducts()

    async function handleOpenEdit(id: number) {
        try {
            const response = await api.get(`/products/get-one-product/${id}`)
            const product: Product = response.data.data.product
            if (response.data.success) {
                console.log(product)
                setSelectedProduct({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    id: product.id
                })
                setUpdateModalOpened(true)
            }
            else {
                toast.error('Erro ao obter dados do produto!')
            }

        }
        catch (error) {
            console.log(`Erro ao obter dados do produto ${id}: ${error}`)
        }
    }

    return (
        <div className="w-full mt-6 flex flex-wrap overflow-y-scroll gap-x-12 gap-y-12" style={{ height: 'calc(100vh - 226px)' }}>
            {data?.data.products.map((product) => (
                <div
                    key={product.id}
                    className="w-[250px] h-[200px] bg-[rgb(var(--background))] rounded-[20px] shadow-sm p-3"
                >
                    <h1 className="text-[1.5rem] font-mediun">{product.name}</h1>
                    <p>{product.description}</p>
                    <div className="w-full h-[1px] bg-[var(--primary)] opacity-5 mt-3" />
                    <div className="mt-3 flex items-center justify-between">
                        <p>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div className="flex items-center justify-between gap-3">
                            <div onClick={() => handleOpenEdit(product.id)} className="viewModeSelector bg-[rgb(var(--background))] p-2 w-max h-[35px] rounded-[10px] border-solid border-[1px] transition-color duration-300 cursor-pointer"><Pencil size={15} strokeWidth={1.2} /></div>
                            <button onClick={() => deleteProduct(product.id)} className="viewModeSelector bg-red-100 text-red-600 border-red-400 p-2 w-max h-max rounded-[10px] border-solid border-[1px] transition-color duration-300 cursor-pointer"><Trash size={15} strokeWidth={1.2} /></button>
                        </div>
                    </div>
                    <small>{product.stock > 1 ?
                        <>{product.stock} Itens em stock</> : product.stock === 1 ?
                            <>{product.stock} Item em stock</> : <>Sem itens em stock</>}</small>
                </div>
            ))}
        </div>
    );
}
