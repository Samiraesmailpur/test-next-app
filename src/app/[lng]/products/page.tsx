'use client'
import StoreProvider from "../StoreProvider";
import ProductsList from "@/components/ProductsList";


const Products = () => {
    return (
        <StoreProvider>
            <ProductsList/>
        </StoreProvider>
    );
};

export default Products;
