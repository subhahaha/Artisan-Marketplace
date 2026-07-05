import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white/60 border border-ink/10 rounded-sm overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-dark">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-plum text-paper text-xs font-mono px-2 py-1 rounded-sm tracking-wide">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg text-ink leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-ink-soft mt-1">{product.seller}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-gold text-base font-medium">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.stock <= 5 && (
            <span className="text-xs text-sage font-medium">
              only {product.stock} left
            </span>
          )}
        </div>
      </div>

      {/* signature stitched-edge detail, appears on hover as a craft/fabric cue */}
      <div className="h-[2px] w-full stitch-border opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
