"use client";

type FiltersProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPrice: string;
  setSelectedPrice: (value: string) => void;
};

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: FiltersProps) {
  return (
    <div className="flex gap-4 mb-6">

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        <option value="">All Categories</option>
        <option value="Woodwork">Woodwork</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Home Décor">Home Décor</option>
      </select>

      {/* Price Filter */}
      <select
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        <option value="">Any Price</option>
        <option value="50">Under $50</option>
        <option value="100">Under $100</option>
      </select>
    </div>
  );
}
