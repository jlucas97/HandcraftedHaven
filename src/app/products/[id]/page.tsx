"use client";

import { useEffect, useState } from "react";
import { products } from "../../../data/products";
import { sellers } from "../../../data/sellers";

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default function ProductDetailPage({ params }: ProductPageProps) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState("");
    const [product, setProduct] = useState<any>(null);
    const [seller, setSeller] = useState<any>(null);

    useEffect(() => {
        async function loadData() {
            const { id } = await params;
            const productId = parseInt(id, 10);

            const found = products.find((p) => p.id === productId);
            setProduct(found);

            if (found) {
                const foundSeller = sellers.find((s) => s.id === found.sellerId);
                setSeller(foundSeller);
            }

            const stored = JSON.parse(localStorage.getItem(`reviews-${productId}`) || "[]");
            setReviews(stored);
        }

        loadData();
    }, [params]);

    if (!product) {
        return (
            <main className="p-6">
                <h1 className="text-xl font-semibold mb-4">Product Not Found</h1>
                <p>The product you're looking for does not exist.</p>
            </main>
        );
    }

    const handleAddReview = () => {
        if (!newReview.trim()) return;

        const reviewObj = {
            text: newReview,
            date: new Date().toISOString(),
        };

        const updated = [...reviews, reviewObj];
        setReviews(updated);

        localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updated));
        setNewReview("");
    };

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg object-cover border"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    <p className="text-yellow-600 mb-1">⭐ {product.rating}</p>
                    <p className="text-gray-600 mb-2">Category: {product.category}</p>

                    {seller && (
                        <p className="text-gray-700 mb-2">
                            Seller:
                            <a
                                href={`/sellers/${seller.id}`}
                                className="text-amber-700 font-medium hover:underline ml-1"
                            >
                                {seller.name}
                            </a>
                        </p>
                    )}

                    <p className="text-2xl font-semibold mb-4">${product.price}</p>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md">
                        Add to Cart
                    </button>
                </div>
            </div>

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

                {reviews.length === 0 && (
                    <p className="text-gray-600 mb-4">No reviews yet. Be the first!</p>
                )}

                <div className="flex flex-col gap-4 mb-8">
                    {reviews.map((r, idx) => (
                        <div key={idx} className="border p-3 rounded bg-gray-50">
                            <p>{r.text}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(r.date).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3 max-w-lg">
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        className="border rounded p-3 w-full h-24"
                    />

                    <button
                        onClick={handleAddReview}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
                    >
                        Submit Review
                    </button>
                </div>
            </section>
        </main>
    );
}
