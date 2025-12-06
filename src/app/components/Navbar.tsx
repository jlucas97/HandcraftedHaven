import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Handcrafted Haven
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li>
            <Link href="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-black">
              Catalog
            </Link>
          </li>
          <li>
            <Link href="/sellers" className="hover:text-black">
              Sellers
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-black">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
