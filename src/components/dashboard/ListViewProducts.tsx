import useDashboard from "@/hooks/useDashboard";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/interfaces/product";
import { Pencil, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import api from "@/services/api";

interface IProps {
    setUpdateModalOpened: Dispatch<SetStateAction<boolean>>
    setSelectedProduct: Dispatch<SetStateAction<Product>>
}

export default function ListViewProducts({ setUpdateModalOpened, setSelectedProduct }: IProps) {

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
        <div className="w-full mt-6 flex flex-col overflow-y-scroll gap-3" style={{ height: 'calc(100vh - 226px)' }}>
            {data?.data.products.map((product) => (
                <div
                    key={product.id}
                    className="w-full h-[60px] bg-[rgb(var(--background))] rounded-[8px] border-[1px] border-solid p-3 flex items-center justify-start"
                >
                    <div className="flex w-full">
                        <div className="w-max sm:w-[30%]">
                            <h1 className="text-[0.8rem] font-semibold">{product.name}</h1>
                            <p className="">{product.description}</p>
                        </div>
                        <div className="flex items center w-[100px] justify-center flex-col text-[0.8rem]">
                            <p className="text-[0.75rem]">Preço</p>
                            <p>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <small className="h-max mt-3 ml-24 text-[0.8rem]">{product.stock > 1 ?
                            <>{product.stock} Itens em stock</> : product.stock === 1 ?
                                <>{product.stock} Ttem em stock</> : <>Sem itens em stock</>}</small>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <div onClick={() => handleOpenEdit(product.id)} className="viewModeSelector bg-[rgb(var(--background))] p-2 w-max h-max rounded-[10px] border-solid border-[1px] transition-color duration-300 cursor-pointer"><Pencil size={15} strokeWidth={1.2} /></div>
                        <button onClick={() => deleteProduct(product.id)} className="viewModeSelector bg-red-100 text-red-600 border-red-400 p-2 w-max h-max rounded-[10px] border-solid border-[1px] transition-color duration-300 cursor-pointer"><Trash size={15} strokeWidth={1.2} /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}
