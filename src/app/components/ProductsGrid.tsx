"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import { products } from "../products/mockData";

export default function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "" || product.category === selectedCategory;

    const matchPrice =
      selectedPrice === "" || product.price <= Number(selectedPrice);

    return matchCategory && matchPrice;
  });

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Browse Products</h2>

      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </div>
    </section>
  );
}
