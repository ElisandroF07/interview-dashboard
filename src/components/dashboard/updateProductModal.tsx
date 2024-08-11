import { PackageCheck } from "lucide-react"
import ButtonComponent from "../shared/buttonComponent"
import InputField from "../shared/inputField"
import useProducts from "@/hooks/useProducts"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { Product } from "@/interfaces/product"


interface IProps {
    opened: boolean,
    closeModal: Dispatch<SetStateAction<boolean>>,
    setSelectedProduct: Dispatch<SetStateAction<Product>>,
    selectedProduct: Product
}

export default function UpdateProductModal({ opened, closeModal, selectedProduct, setSelectedProduct }: IProps) {

    const { errorsProduct, handleSubmitProduct, registerProduct, updateProduct, isLoading } = useProducts()

    const modalRef = useRef<HTMLDivElement>(null);

    // Função para fechar o modal ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setSelectedProduct(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    useEffect(() => {
        if (opened) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [opened]);

    return (
        <div ref={modalRef} data-opened={opened} className="modal w-[350px] h-full gap-4 absolute top-0 right-[-350px] bg-[rgb(var(--background))] transition-all duration-300 z-10 border-l-[1px] border-l-solid" >
            <div className="flex px-4 mt-4">
                <h1 className="text-[#333] text-[1.3rem] font-semibold flex gap-2 items-center justify-center">Atualizar produto <PackageCheck size={25} strokeWidth={1.9} /></h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateProduct(selectedProduct.id, selectedProduct)
            }} className="px-4 mt-8 flex flex-col gap-3 w-full">
                <InputField
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                    label="Nome"
                    id="name"
                    placeholder="Tv 32' FHD+"
                />
                <InputField
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                    label="Descrição"
                    id="description"
                    placeholder="Observe o mundo de outro ângulo"
                />
                <InputField
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                    label="Preço"
                    id="price"
                    type="number"
                    placeholder="R$ 2.900,00"
                />
                <InputField
                    value={selectedProduct.stock}
                    onChange={handleInputChange}
                    label="Stock"
                    id="stock"
                    type="number"
                    placeholder="24"
                />
                <ButtonComponent isLoading={isLoading}>Atualizar</ButtonComponent>
            </form>
        </div>
    )
}