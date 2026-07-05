import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/ProductsContext";

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (data) => {
    setSubmitError("");
    try {
      await addProduct(data);
      navigate("/seller/dashboard");
    } catch {
      setSubmitError(
        "Couldn't save this listing. Make sure the API server is running (npm run server) and try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-plum mb-8">Add New Listing</h1>
      {submitError && (
        <p className="text-red-600 text-sm mb-4">{submitError}</p>
      )}
      <ProductForm onSubmit={handleSubmit} submitLabel="Publish listing" />
    </div>
  );
}