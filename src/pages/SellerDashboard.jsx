import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import SellerStats from "../components/SellerStats";

export default function SellerDashboard() {
  const { seller, logout } = useAuth();
  const { sellerProducts, deleteProduct, isLoading } = useProducts();
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
    } catch {
      // if this fails (e.g. API server isn't running), just leave the
      // confirm/cancel buttons as-is so the seller can try again
    }
    setConfirmingDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-plum">Seller Dashboard</h1>
          <p className="text-ink-soft text-sm mt-1">Logged in as {seller.name}</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-ink-soft hover:text-plum transition-colors"
        >
          Log out
        </button>
      </div>

      <SellerStats sellerProducts={sellerProducts} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-ink-soft text-sm">
          {sellerProducts.length} listing{sellerProducts.length !== 1 && "s"}
        </p>
        <Link
          to="/seller/products/new"
          className="bg-plum text-paper px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
        >
          + Add new listing
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-white/40 rounded-sm border border-ink/10 animate-pulse"
            />
          ))}
        </div>
      ) : sellerProducts.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-sm border border-ink/10">
          <p className="text-ink-soft mb-4">
            You haven't listed anything yet.
          </p>
          <Link
            to="/seller/products/new"
            className="text-plum font-medium hover:underline"
          >
            Add your first listing →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sellerProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/60 border border-ink/10 rounded-sm p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg text-ink truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {product.category} · Rs. {product.price.toLocaleString()} ·{" "}
                    {product.stock} in stock
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end sm:gap-4 gap-4">
                <Link
                  to={`/seller/products/${product.id}/edit`}
                  className="text-sm text-plum font-medium hover:underline flex-shrink-0"
                >
                  Edit
                </Link>

                {confirmingDelete === product.id ? (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-sm text-red-600 font-medium hover:underline"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmingDelete(null)}
                      className="text-sm text-ink-soft hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingDelete(product.id)}
                    className="text-sm text-ink-soft hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}