import { PackagePlus } from "lucide-react"
import ButtonComponent from "../shared/buttonComponent"
import InputField from "../shared/inputField"
import useProducts from "@/hooks/useProducts"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"

interface IProps {
    opened: boolean,
    closeModal: Dispatch<SetStateAction<boolean>>
}

export default function CreateProductModal({opened, closeModal}: IProps) {

    const { createProduct, errorsProduct, handleSubmitProduct, registerProduct, isLoading } = useProducts()

    const modalRef = useRef<HTMLDivElement>(null);

    // Função para fechar o modal ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal(false);
        }
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
                <h1 className="text-[#333] text-[1.3rem] font-semibold flex gap-2 items-center justify-center">Adicionar produto <PackagePlus size={25} strokeWidth={1.9} /></h1>
            </div>
            <form onSubmit={handleSubmitProduct(createProduct)} className="px-4 mt-8 flex flex-col gap-3 w-full">
                <InputField haveError={!!errorsProduct.name} {...registerProduct('name')} label="Nome" id="name" placeholder="Tv 32' FHD+" />
                <InputField haveError={!!errorsProduct.description} {...registerProduct('description')} label="Descrição" id="description" placeholder="Observe o mundo de outro ângulo" />
                <InputField haveError={!!errorsProduct.price} {...registerProduct('price')} label="Preço" id="price" type="number" placeholder="R$ 2.900,00" />
                <InputField haveError={!!errorsProduct.stock} {...registerProduct('stock')} label="Stock" id="stock" type="number" placeholder="24" />
                <ButtonComponent isLoading={isLoading} >Adicionar</ButtonComponent>
            </form>
        </div>
    )
}