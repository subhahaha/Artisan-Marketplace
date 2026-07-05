import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem, setQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl text-plum mb-2">
          Your cart is empty
        </p>
        <p className="text-ink-soft mb-6">
          Browse the shop to find something handmade.
        </p>
        <Link
          to="/"
          className="inline-block bg-plum text-paper px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-plum mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/60 border border-ink/10 rounded-sm p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
              />

              <div className="flex-1 min-w-0 sm:hidden">
                <p className="font-display text-lg text-ink truncate">
                  {item.name}
                </p>
                <p className="font-mono text-gold text-sm">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 min-w-0">
              <p className="font-display text-lg text-ink truncate">
                {item.name}
              </p>
              <p className="font-mono text-gold text-sm">
                Rs. {item.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end sm:gap-6 gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="w-8 h-8 flex items-center justify-center border border-ink/15 rounded-sm hover:border-plum/50 hover:text-plum transition-colors"
                >
                  −
                </button>
                <span className="font-mono w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  aria-label={`Increase quantity of ${item.name}`}
                  className="w-8 h-8 flex items-center justify-center border border-ink/15 rounded-sm hover:border-plum/50 hover:text-plum transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-ink/15 disabled:hover:text-inherit"
                >
                  +
                </button>
              </div>

              <p className="font-mono text-ink w-20 sm:w-24 text-right flex-shrink-0">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-ink-soft hover:text-red-600 transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-ink/15 pt-6">
        <span className="font-display text-xl text-ink">Total</span>
        <span className="font-mono text-2xl text-gold font-medium">
          Rs. {total.toLocaleString()}
        </span>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block text-center w-full bg-plum text-paper px-8 py-3 rounded-sm font-medium hover:bg-plum-light transition-colors"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}