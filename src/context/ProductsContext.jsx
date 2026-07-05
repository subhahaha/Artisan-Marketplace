import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBaseProducts,
  fetchSellerProducts,
  createSellerProduct,
  updateSellerProduct as updateSellerProductApi,
  deleteSellerProduct as deleteSellerProductApi,
} from "../api/productsApi";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const queryClient = useQueryClient();

  const baseProductsQuery = useQuery({
    queryKey: ["baseProducts"],
    queryFn: fetchBaseProducts,
  });

  const sellerProductsQuery = useQuery({
    queryKey: ["sellerProducts"],
    queryFn: fetchSellerProducts,
  });

  const invalidateSellerProducts = () =>
    queryClient.invalidateQueries({ queryKey: ["sellerProducts"] });

  const addMutation = useMutation({
    mutationFn: createSellerProduct,
    onSuccess: invalidateSellerProducts,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }) => updateSellerProductApi(id, product),
    onSuccess: invalidateSellerProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSellerProductApi,
    onSuccess: invalidateSellerProducts,
  });

  const baseProducts = baseProductsQuery.data || [];
  const sellerProducts = sellerProductsQuery.data || [];
  const allProducts = [...baseProducts, ...sellerProducts];

  const isLoading = baseProductsQuery.isLoading || sellerProductsQuery.isLoading;
  const isError = baseProductsQuery.isError || sellerProductsQuery.isError;

  // kept as async functions with the same names/shape as the old
  // useReducer version, so pages that already call addProduct(data) etc.
  // don't need to change how they call these — only the internals moved
  // from localStorage to a real API.
  const addProduct = (product) => addMutation.mutateAsync(product);
  const updateProduct = (product) =>
    updateMutation.mutateAsync({ id: product.id, product });
  const deleteProduct = (id) => deleteMutation.mutateAsync(id);

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        sellerProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        isLoading,
        isError,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used inside a ProductsProvider");
  }
  return context;
}