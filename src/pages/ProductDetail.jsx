import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { allProducts } = useProducts();
  const { cart, addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const product = allProducts.find((p) => p.id === id);

  const inCart = cart.find((item) => item.id === id);
  const remaining = product ? product.stock - (inCart?.quantity || 0) : 0;

  const handleAddToCart = () => {
    if (remaining <= 0) return;
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl text-plum mb-2">
          We couldn't find that piece
        </p>
        <p className="text-ink-soft mb-6">
          It may have sold out or the link might be wrong.
        </p>
        <Link
          to="/"
          className="inline-block bg-plum text-paper px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        to="/"
        className="text-sm text-ink-soft hover:text-plum transition-colors mb-6 inline-block"
      >
        ← Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-paper-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="inline-block bg-plum text-paper text-xs font-mono px-2 py-1 rounded-sm tracking-wide mb-3">
            {product.category}
          </span>

          <h1 className="font-display text-3xl text-ink mb-1">
            {product.name}
          </h1>
          <p className="text-ink-soft mb-4">by {product.seller}</p>

          <p className="font-mono text-gold text-2xl font-medium mb-6">
            Rs. {product.price.toLocaleString()}
          </p>

          <p className="text-ink-soft leading-relaxed mb-6">
            {product.description}
          </p>

          <p className="text-sm mb-6">
            {remaining > 5 ? (
              <span className="text-sage font-medium">In stock</span>
            ) : remaining > 0 ? (
              <span className="text-gold font-medium">
                Only {remaining} left
              </span>
            ) : inCart ? (
              <span className="text-ink-soft font-medium">
                All {product.stock} in your cart
              </span>
            ) : (
              <span className="text-red-600 font-medium">Sold out</span>
            )}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={remaining <= 0}
            className="w-full sm:w-auto bg-plum text-paper px-8 py-3 rounded-sm font-medium hover:bg-plum-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {justAdded ? "Added ✓" : remaining <= 0 ? "Max in cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}