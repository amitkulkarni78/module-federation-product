import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, fetchProducts } from "../productsStore";
import ProductList from "./productList";
import { CircularProgress, Alert, Box } from "@mui/material";

function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                await dispatch(fetchProducts()).unwrap();
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        };
        loadProducts();
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={2}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!products.length) {
        return (
            <Box p={2}>
                <Alert severity="info">
                    No products available
                </Alert>
            </Box>
        );
    }

    return (
        <div>
            <ProductList products={products} />
        </div>
    );
}
// console.log(products)
export default Products;
