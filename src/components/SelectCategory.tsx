import {useEffect, useState} from "react";
import * as React from "react";
import { useRouter, useSearchParams } from 'next/navigation';


type Product = {
    asin: string;
    name: string;
    price: number;
    img: string;
    bsr_category: string;
    link: string;
};

interface ProductsProps {
    products: Product[],
    onSelectCategory: (value: string) => void,
}

const SelectCategory: React.FC<ProductsProps>  = ({ products, onSelectCategory }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchCategory = searchParams.get('category') || '';
    const [selectedCategory, setSelectedCategory] = useState(searchCategory);

    const categories = [...new Set(products.map((item) => item.bsr_category))];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        onSelectCategory(selectedValue);
        const params = new URLSearchParams(searchParams.toString());
        params.set('category', selectedValue);
        router.replace(`?${params.toString()}`);
    };


    useEffect(() => {
        if (searchCategory) {
            onSelectCategory(searchCategory);
        } else {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            router.replace(`?${params.toString()}`);
        }
    }, [searchCategory]);


    return (
        <div className="py-4 relative w-[150px]">
            <label htmlFor="select-category" className="block text-sm font-medium text-gray-700 absolute top-0">
                Categories
            </label>
            <select
                id="select-category"
                value={selectedCategory}
                onChange={handleChange}
                className="text-[#929292] mt-1 block w-full px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-4"
            >
                <option value="">
                    None
                </option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectCategory;
