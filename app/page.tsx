"use client";
import React, { useState } from "react";

const productsData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 4.5,
    category: "Medicamentos",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Gel Hidroalcohólico",
    price: 3.2,
    category: "Higiene",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Termómetro Digital",
    price: 12.99,
    category: "Equipos",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Mascarillas (pack 10)",
    price: 5.75,
    category: "Protección",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    name: "Ibuprofeno 400mg",
    price: 6.1,
    category: "Medicamentos",
    image: "https://via.placeholder.com/150"
  }
];

export default function PharmacyApp() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Farmacia Online</h1>
        <div className="flex items-center gap-2 text-green-700">
          <span>🛒</span>git add .
git commit -m "mi app"
          <span>{cart.length}</span>
        </div>
      </header>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="rounded-2xl shadow bg-white">
            <div className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-lg font-bold mt-2 text-green-700">
                €{product.price}
              </p>
              <button
                className="mt-3 w-full bg-green-600 hover:bg-green-700"
                onClick={() => addToCart(product)}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrito */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item: any, index: any) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-xl shadow"
              >
                <span>{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-green-700">€{item.price}</span>
                  <button
                    variant="destructive"
                    onClick={() => removeFromCart(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right font-bold text-xl mt-4 text-green-800">
              Total: €{total.toFixed(2)}
            </div>

            <button className="w-full mt-3 bg-green-600 hover:bg-green-700">
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
