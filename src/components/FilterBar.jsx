import { categories } from "../data/products";

export default function FilterBar({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for pottery, textiles, jewelry…"
        className="w-full sm:w-96 bg-white/70 border border-ink/15 rounded-sm px-4 py-2.5 font-body text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-gold/60"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3.5 py-1.5 rounded-sm text-sm font-medium border transition-colors ${
              activeCategory === cat
                ? "bg-plum text-paper border-plum"
                : "bg-transparent text-ink-soft border-ink/15 hover:border-plum/50 hover:text-plum"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
