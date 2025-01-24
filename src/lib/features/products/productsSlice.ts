import { createSlice, Reducer } from "@reduxjs/toolkit";
import { getProducts, getProductByAsin } from "./productsOperations";

export type Product = {
    asin: string;
    name: string;
    price: number;
    img: string;
    bsr_category: string;
    link: string;
};

export type ProductsState = {
    products: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.error = null;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An unknown error occurred.';
            })
            .addCase(getProductByAsin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductByAsin.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(getProductByAsin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An unknown error occurred.';
            });
    },
});

export const productsReducer = productsSlice.reducer as Reducer<ProductsState>;
