'use client'
import StoreProvider from "../../StoreProvider";
import ProductItem from "@/components/ProductItem";


const Product = () => {
    return (
        <StoreProvider>
            <ProductItem />
        </StoreProvider>

    );
};

export default Product;
