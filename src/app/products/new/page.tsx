"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Load logged in user
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || user.role !== "seller") {
      alert("Only sellers can create products.");
      return;
    }

    // Basic validation
    if (!form.name || !form.price || !form.category || !form.description) {
      alert("All fields are required.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      sellerId: user.sellerId,
    };

    // Save to localStorage (dynamic products)
    const stored = JSON.parse(localStorage.getItem("myProducts") || "[]");

    localStorage.setItem(
      "myProducts",
      JSON.stringify([...stored, newProduct])
    );

    alert("Product added!");

    // Redirect seller to their store
    router.push(`/sellers/${user.sellerId}`);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Product Name"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </main>
  );
}
