import { Link } from "react-router-dom";

export default function OrderConfirmed() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 text-center">
      <p className="font-display text-3xl text-plum mb-3">
        Order placed ✓
      </p>
      <p className="text-ink-soft mb-8 max-w-md mx-auto">
        Thank you for supporting local artisans. This is a demo checkout, so
        no real order was placed — but if it had been, you'd get a
        confirmation email shortly.
      </p>
      <Link
        to="/"
        className="inline-block bg-plum text-paper px-6 py-3 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
}