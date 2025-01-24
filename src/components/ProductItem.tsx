'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductByAsin } from "@/lib/features/products/productsOperations";


const ProductItem = () => {
    const { asin } = useParams<{ asin: string }>()
    const dispatch = useAppDispatch();
    const { product, loading } = useAppSelector((state) => state.products);


    useEffect(() => {
        dispatch(getProductByAsin(asin));
    }, [asin, dispatch]);


    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex bg-white shadow-lg rounded-lg">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-1/2 object-contain p-4"
                />
                <div className="p-4 flex flex-col gap-2.5">
                    <h1 className="text-xl font-semibold">{product.name}</h1>
                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                    <p className="text-sm text-gray-600">Category: {product.bsr_category}</p>
                    <Link href={product.link} className="mt-2">
                        <button className="bg-[#1976d2] text-white py-2 px-4 rounded hover:bg-[#186bbd  ]">
                            More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
