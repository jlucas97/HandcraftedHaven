export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">Handcrafted Haven</h1>

        {/* Navigation */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li className="hover:text-black cursor-pointer">Home</li>
          <li className="hover:text-black cursor-pointer">Catalog</li>
          <li className="hover:text-black cursor-pointer">Sellers</li>
          <li className="hover:text-black cursor-pointer">Login</li>
        </ul>
      </div>
    </nav>
  );
}
