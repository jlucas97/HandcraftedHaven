"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { products as baseProducts } from "../../data/products";
import { sellers } from "../../data/sellers";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const logged = JSON.parse(stored);
    setUser(logged);

    // Get seller data
    const foundSeller = sellers.find((s) => s.id === logged.sellerId);
    setSeller(foundSeller);

    // Combine DB products with locally created ones
    const custom = JSON.parse(localStorage.getItem("myProducts") || "[]");
    const allProducts = [...baseProducts, ...custom];

    // Filter products belonging to this seller
    const mine = allProducts.filter((p) => p.sellerId === logged.sellerId);
    setSellerProducts(mine);
  }, [router]);

  if (!seller) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Loading Dashboard…</h1>
      </main>
    );
  }

  // Delete Product
  function handleDelete(id: number) {
    let custom = JSON.parse(localStorage.getItem("myProducts") || "[]");
    custom = custom.filter((p: any) => p.id !== id);
    localStorage.setItem("myProducts", JSON.stringify(custom));

    setSellerProducts((prev) => prev.filter((p) => p.id !== id));
    alert("Product deleted!");
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      {/* Profile Section */}
      <section className="flex gap-6 items-center mb-10">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-28 h-28 rounded-full object-cover border shadow"
        />
        <div>
          <h2 className="text-2xl font-semibold">{seller.name}</h2>
          <p className="text-gray-600">{seller.bio}</p>

          <button
            onClick={() => router.push("/products/new")}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Add New Product
          </button>
        </div>
      </section>

      {/* Summary Section */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-3">Store Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="border p-4 rounded bg-white shadow">
            <p className="text-gray-600">Total Products</p>
            <h4 className="text-2xl font-bold">{sellerProducts.length}</h4>
          </div>

          <div className="border p-4 rounded bg-white shadow">
            <p className="text-gray-600">Pending Orders</p>
            <h4 className="text-xl font-semibold">0</h4>
          </div>

          <div className="border p-4 rounded bg-white shadow">
            <p className="text-gray-600">Total Reviews</p>
            <h4 className="text-xl font-semibold">
              {sellerProducts.length * 3}
            </h4>
          </div>
        </div>
      </section>

      {/* Product Management Section */}
      <section>
        <h3 className="text-xl font-bold mb-6">Your Products</h3>

        {sellerProducts.length === 0 ? (
          <p className="text-gray-600">You haven't listed any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sellerProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />

                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-gray-600 text-sm">{p.category}</p>
                <p className="text-amber-700 font-bold mt-1">${p.price}</p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => router.push(`/products/edit/${p.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
