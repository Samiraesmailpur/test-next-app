'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/features/products/productsOperations";
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

import SearchProducts from "./SearchProducts";
import SelectCategory from "./SelectCategory";


const Products = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector((state) => state.products);


    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.bsr_category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });


    useEffect(() => {
        dispatch(getProducts());
    }, []);


    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="flex justify-center items-baseline gap-3 mb-4 pt-4">
                <SearchProducts onSearch={(query) => setSearchQuery(query)}/>
                <SelectCategory products={products} onSelectCategory={(category) => setSelectedCategory(category)}/>
            </div>
            <div className="space-y-4">
                {filteredProducts.map((product) => (
                    <div key={product.asin} className="flex bg-white shadow-md rounded-lg p-4">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-36 h-36 object-contain mr-4"
                        />
                        <div className="flex flex-col flex-grow">
                            <div className="text-lg font-semibold">{product.name}</div>
                            <div className="text-sm text-gray-600">Price: ${product.price}</div>
                            <div className="text-sm text-gray-600">Category: {product.bsr_category}</div>
                            <Link href={`/products/${product.asin}`} className="mt-2">
                                <button className="bg-[#1976d2] text-white py-2 px-4 rounded hover:bg-[#186bbd  ]">
                                    View
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
