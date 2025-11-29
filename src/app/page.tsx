import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Categories */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Jewelry", "Clothing", "Home Decoration", "Art", "Woodwork", "Accessories"].map(
            (category) => (
              <div
                key={category}
                className="border p-6 rounded-md text-center hover:bg-gray-50"
              >
                {category}
              </div>
            )
          )}
        </div>
        
      </section>

      {/* Community Section */}
      <section className="px-6 py-16 text-center bg-gray-100 mt-10">
        <h3 className="text-xl font-semibold mb-4">
          Are you an artisan?
        </h3>
        <p className="text-gray-600 mb-6">
          Join our community and share your handmade creations.
        </p>
        <button className="px-6 py-3 bg-gray-900 text-white rounded-md">
          Join our Artisan Community
        </button>
      </section>
    </main>
  );
}
