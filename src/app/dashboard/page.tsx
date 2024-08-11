'use client'

import CardViewProducts from "@/components/dashboard/cardViewProducts";
import CreateProductModal from "@/components/dashboard/createProductModal";
import ListViewProducts from "@/components/dashboard/ListViewProducts";
import useDashboard from "@/hooks/useDashboard";
import { Rows3, LayoutGrid, PackagePlus } from "lucide-react";
import UpdateProductModal from "@/components/dashboard/updateProductModal";
import useProducts from "@/hooks/useProducts";

export default function HomePage() {

    const { viewMode, setViewMode, data } = useDashboard()
    const { selectedProduct, setSelectedProduct, setIsModalOpened, isModalOpened, updateModalOpened, setUpdateModalOpened } = useProducts()

    return (
        <div className="p-6">
            <div className="w-full h-max flex items-center justify-between">
                <div>
                    <h1 className="text-[#333] text-[1.3rem] font-semibold">Produtos</h1>
                    <p className="text-[0.75rem] opacity-70">Gerencie os seus produtos</p>
                </div>
                <button onClick={() => setIsModalOpened(true)} className="text-[rgb(var(--background))] bg-[#0066a1] p-3 rounded-[12px] hover:bg-[#236185] transition-color duration-300"><PackagePlus size={17} strokeWidth={1.5} /></button>
            </div>
            <div className="w-full h-[1px] bg-[var(--primary)] opacity-5 mt-3" />
            <div className="w-full h-max flex items-center justify-between mt-3">
                <div className="flex items-center justify-between gap-3">
                    <p className="opacity-70 text-[0.75rem]">Produtos: <span className="p-2.5 bg-slate-200 text-slate-600 font-medium border-[1px] border-solid border-slate-300 rounded-[10px]">{data?.data.products.length}</span></p>                </div>
                <div className="flex items-center justify-between gap-2">
                    <div onClick={() => setViewMode(1)} data-selected={viewMode === 1} className="viewModeSelector bg-[rgb(var(--background))] p-2.5 w-max h-max rounded-[10px] border-solid border-[1px] transition-color duration-300 cursor-pointer"><LayoutGrid size={18} strokeWidth={1.2} /></div>
                    <div onClick={() => setViewMode(2)} data-selected={viewMode === 2} className="viewModeSelector bg-[rgb(var(--background))] p-2.5 w-max h-max rounded-[10px] border-solid border-[1px] transition-color duration-300 cursor-pointer"><Rows3 size={18} strokeWidth={1.2} /></div>
                </div>
            </div>
            {
                viewMode === 1 && <CardViewProducts setSelectedProduct={setSelectedProduct} setUpdateModalOpened={setUpdateModalOpened} />
            }
            {
                viewMode === 2 && <ListViewProducts setSelectedProduct={setSelectedProduct} setUpdateModalOpened={setUpdateModalOpened} />
            }
            <UpdateProductModal setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} opened={updateModalOpened} closeModal={setUpdateModalOpened} />
            <CreateProductModal opened={isModalOpened} closeModal={setIsModalOpened} />

        </div>
    )
}