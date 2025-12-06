import { products } from "@/app/products/mockData";

type SellerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SellerPage({ params }: SellerPageProps) {
  const { id } = await params;

  const sellerProduct = products.find((p) => p.seller.id === id);

  if (!sellerProduct) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Seller Not Found</h1>
      </main>
    );
  }

  const seller = sellerProduct.seller;

  // Filter all products belonging to this seller
  const sellerProducts = products.filter((p) => p.seller.id === id);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* Seller Header */}
      <div className="flex items-start gap-6 mb-12">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-3xl font-bold">{seller.name}</h1>
          <p className="text-gray-700 mt-2">{seller.bio}</p>
          <p className="text-gray-600 mt-2">
            {sellerProducts.length} Products Available
          </p>
        </div>
      </div>

      {/* Product List */}
      <h2 className="text-2xl font-semibold mb-6">Products by {seller.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sellerProducts.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.id}`}
            className="border p-4 rounded-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3 bg-gray-200"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="font-bold mt-2">${product.price}</p>
          </a>
        ))}
      </div>

    </main>
  );
}
