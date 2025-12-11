"use client";

import { useEffect, useState } from "react";
import { sellers } from "../../../data/sellers";
import { products as baseProducts } from "../../../data/products";
import { useRouter } from "next/navigation";

type SellerPageProps = {
  params: Promise<{ id: string }>;
};

export default function SellerDetailPage({ params }: SellerPageProps) {
  const [seller, setSeller] = useState<any>(null);
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [loggedUser, setLoggedUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { id } = await params;

      // Load logged-in user
      const stored = localStorage.getItem("user");
      if (stored) setLoggedUser(JSON.parse(stored));

      // Find seller by ID
      const foundSeller = sellers.find((s) => s.id === id);
      setSeller(foundSeller);

      // Merge static products with seller-created products from localStorage
      const storedProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");

      const allProducts = [...baseProducts, ...storedProducts];

      // Filter products belonging to this seller
      const matching = allProducts.filter((p) => p.sellerId === id);

      setSellerProducts(matching);
    }

    loadData();
  }, [params]);

  if (!seller) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold mb-4">Seller Not Found</h1>
        <p>The seller you're trying to view does not exist.</p>
      </main>
    );
  }

  // -----------------------------
  // Delete Product Handler
  // -----------------------------
  function handleDelete(id: number) {
    const storedProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");
    const updated = storedProducts.filter((p: any) => p.id !== id);

    localStorage.setItem("myProducts", JSON.stringify(updated));

    alert("Product deleted!");
    router.refresh();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* SELLER HEADER */}
      <section className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-40 h-40 rounded-full object-cover border shadow"
        />

        <div>
          <h1 className="text-3xl font-bold">{seller.name}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">{seller.bio}</p>
        </div>
      </section>

      {/* SELLER PRODUCTS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Products by {seller.name}</h2>

        {sellerProducts.length === 0 ? (
          <p className="text-gray-600">This seller has no listed products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sellerProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
              >
                {/* Product Link */}
                <a href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />

                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">Category: {product.category}</p>
                  <p className="text-amber-700 font-bold mt-2">${product.price}</p>
                </a>

                {/* EDIT + DELETE (only for seller) */}
                {loggedUser?.role === "seller" && loggedUser.sellerId === seller.id && (
                  <div className="flex justify-between mt-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => router.push(`/products/edit/${product.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
