'use client'

import * as React from 'react';
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter, useSearchParams } from 'next/navigation';

type ProductsProps = {
    onSearch: (searchQuery: string) => void;
};

type FormValues = {
    name: string;
};

const SearchProducts: React.FC<ProductsProps> = ({ onSearch }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('name') || '';

    const schema = Yup.object({
        name: Yup.string()
            .min(3, "Minimum 3 symbols are required")
            .required("This field is required"),
    }).required();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: search,
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        const newSearch = values.name.trim();
        const params = new URLSearchParams(searchParams.toString());

        if (newSearch) {
            params.set('name', newSearch);
        } else {
            params.delete('name');
        }

        router.push(`?${params.toString()}`);
        onSearch(newSearch);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value.trim();

        if (newSearch === '') {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('name');
            router.replace(`?${params.toString()}`);
            onSearch('');
        }
    };

    useEffect(() => {
        if (search) {
            onSearch(search);
        }
    }, [search, setValue, onSearch]);

    return (
        <div className='flex align-center justify-center mb-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col w-[300px]'>
                    <input
                        className='w-full rounded-lg py-4 px-3.5 border-[#c7c7c9] border focus:outline-none'
                        type="text"
                        placeholder="Search"
                        {...register("name", {
                            onChange: handleChange,
                        })}
                    />
                    <p className='text-red-700'>
                        {errors.name?.message}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SearchProducts;
