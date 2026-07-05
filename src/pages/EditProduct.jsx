import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/ProductsContext";

export default function EditProduct() {
  const { id } = useParams();
  const { sellerProducts, updateProduct, isLoading } = useProducts();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const product = sellerProducts.find((p) => p.id === id);

  const handleSubmit = async (data) => {
    setSubmitError("");
    try {
      await updateProduct({ ...data, id: product.id });
      navigate("/seller/dashboard");
    } catch {
      setSubmitError(
        "Couldn't save changes. Make sure the API server is running (npm run server) and try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-ink-soft">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl text-plum mb-2">
          Listing not found
        </p>
        <p className="text-ink-soft mb-6">
          It may have already been deleted, or this isn't one of your
          listings.
        </p>
        <Link
          to="/seller/dashboard"
          className="inline-block bg-plum text-paper px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-plum mb-8">Edit Listing</h1>
      {submitError && (
        <p className="text-red-600 text-sm mb-4">{submitError}</p>
      )}
      <ProductForm
        initialValues={product}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </div>
  );
}