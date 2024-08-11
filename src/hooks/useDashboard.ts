import { Product } from "@/interfaces/product";
import api from "@/services/api";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MouseEvent, RefObject } from "react";

enum ViewMode {
    list = 1,
    cards = 2
}

interface ApiResponse {
    success: boolean;
    message: string | null;
    data: {
        products: Product[];
    };
}

export default function useDashboard() {

    const { data: session } = useSession();
    const [viewMode, setViewMode] = useState<ViewMode>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    api.defaults.headers.common.Authorization = `Bearer ${session?.user?.name}`

    const fetchProducts = async (): Promise<ApiResponse> => {
        const res = await api.get<ApiResponse>(`/products/get-all-products`);
        return res.data;
    };

    const { data }: UseQueryResult<ApiResponse> = useQuery({
        queryFn: fetchProducts,
        queryKey: ["get-all-products"],
    });

    return { viewMode, setViewMode, data, isLoading }
}