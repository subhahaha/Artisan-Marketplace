import { useMemo, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const { allProducts, isLoading, isError } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, search, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-plum mb-2">
          Handmade, from Nepal's workshops to you
        </h1>
        <p className="text-ink-soft max-w-xl">
          Every piece here is made by an independent artisan — pottery,
          weaving, silverwork, and more. No mass production, no two pieces
          exactly alike.
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-paper-dark rounded-sm animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-ink-soft">
          <p className="font-display text-xl text-plum mb-1">
            Couldn't load the shop
          </p>
          <p>
            The API server isn't running (
            <code className="font-mono text-xs bg-paper-dark px-1.5 py-0.5 rounded-sm">
              npm run server
            </code>
            ) 
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-ink-soft">
          <p className="font-display text-xl text-plum mb-1">
            Nothing matches that search
          </p>
          <p>Try a different category or clear the search box.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}