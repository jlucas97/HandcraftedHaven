import { products } from "../mockData";

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { id } = await params; // 👈 required in Next.js 15/16

    const productId = parseInt(id, 10);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return (
            <main className="p-6">
                <h1 className="text-xl font-semibold mb-4">Product Not Found</h1>
                <p>The product you're looking for does not exist.</p>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* IMAGE */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg object-cover border"
                    />
                </div>

                {/* INFO */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    <p className="text-yellow-600 mb-1">⭐ {product.rating}</p>
                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                    <p className="text-gray-700 mb-2">
                        Seller:
                        <a
                            href={`/sellers/${product.seller.id}`}
                            className="text-amber-700 font-medium hover:underline ml-1"
                        >
                            {product.seller.name}
                        </a>
                    </p>


                    <p className="text-2xl font-semibold mb-4">${product.price}</p>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md">
                        Add to Cart
                    </button>
                </div>

            </div>
        </main>
    );
}
