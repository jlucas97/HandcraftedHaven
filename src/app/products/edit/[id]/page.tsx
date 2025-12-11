"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { products as baseProducts } from "../../../../data/products";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditProductPage({ params }: EditPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const productId = Number(id);

      // Load static + local products
      const storedProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");
      const allProducts = [...baseProducts, ...storedProducts];

      const found = allProducts.find((p) => p.id === productId);
      if (!found) return;

      setProduct(found);

      // Pre-fill form
      setForm({
        name: found.name,
        price: String(found.price),
        category: found.category ?? "",
        description: found.description ?? "",
      });
    }

    load();
  }, [params]);

  // Prevent editing until product is loaded
  if (!product) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold">Product Not Found</h1>
        <p>We couldn't find this product.</p>
      </main>
    );
  }

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");

    // Update only if product exists in localStorage (seller-created)
    const updated = storedProducts.map((p: any) =>
      p.id === product.id
        ? {
            ...p,
            name: form.name,
            price: Number(form.price),
            category: form.category,
            description: form.description,
          }
        : p
    );

    localStorage.setItem("myProducts", JSON.stringify(updated));

    alert("Product updated!");
    router.push(`/sellers/${product.sellerId}`);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Product Name"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Price"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Category"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded h-24"
          placeholder="Description"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </main>
  );
}
