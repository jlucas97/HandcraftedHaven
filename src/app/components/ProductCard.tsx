import Link from "next/link";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductCard({ id, name, price, category, image }: ProductProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="border p-4 rounded-md hover:shadow-lg transition cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-md mb-3 bg-gray-200"
        />
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600">{category}</p>
        <p className="font-bold mt-2">${price}</p>
      </div>
    </Link>
  );
}
