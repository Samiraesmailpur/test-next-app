import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from '@/types/product';

interface ProductsResponse {
    products: Product[];
}

export const getProducts = createAsyncThunk<ProductsResponse, void, { rejectValue: string }>(
    "products/getProducts",
    async (page, thunkAPI) => {
        try {
            const res = await axios.get("/products.json");
            return res.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.message) {
                return thunkAPI.rejectWithValue(e.response.data.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred.');
        }
    }
);

export const getProductByAsin = createAsyncThunk<Product, string, { rejectValue: string }>(
    "products/getProductByAsin",
    async (asin, thunkAPI) => {
        try {
            const resp = await axios.get("/products.json");
            const product = resp.data.products.find((prod: Product) => prod.asin === asin);
            return product;
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.message) {
                return thunkAPI.rejectWithValue(e.response.data.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred.');
        }
    }
);
