"use client";
import React, { useState, useRef, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string; 
}

interface CartItem extends Product {
  quantity: number;
}

const productsData = [
  { id: 1, name: "Paracetamol 500mg", price: 4.5, category: "Medicamentos", image: "ChatGPT Image 24 abr 2026, 17_33_21.png", description: "Analgésico y antipirético de uso común. Alivia el dolor leve o moderado y reduce la fiebre. Apto para adultos y niños mayores de 12 años." },
  { id: 2, name: "Gel Hidroalcohólico", price: 3.2, category: "Higiene", image: "ChatGPT Image 24 abr 2026, 17_33_12.png", description: "Gel desinfectante de manos con 70% de alcohol. Elimina el 99,9% de los gérmenes sin necesidad de agua. Formato 500ml." },
  { id: 3, name: "Termómetro Digital", price: 12.99, category: "Equipos", image: "ChatGPT Image 24 abr 2026, 17_33_06.png", description: "Termómetro digital de lectura rápida en 10 segundos. Indicador de fiebre con señal sonora. Incluye funda protectora." },
  { id: 4, name: "Mascarillas (pack 10)", price: 5.75, category: "Protección", image: "Gemini_Generated_Image_ev0ad8ev0ad8ev0a.png", description: "Mascarillas quirúrgicas de tipo IIR. Pack de 10 unidades. Alta filtración y ajuste cómodo para uso prolongado." },
  { id: 5, name: "Ibuprofeno 400mg", price: 6.1, category: "Medicamentos", image: "Gemini_Generated_Image_vpmbznvpmbznvpmb.png", description: "Antiinflamatorio, analgésico y antipirético. Indicado para dolor muscular, de cabeza y estados febriles. Tomar con alimentos." },
  { id: 6, name: "Tiritas infantiles", price: 3.83, category: "Parafarmacia", image: "Gemini_Generated_Image_j9ko62j9ko62j9ko.png", description: "Tiritas para los más peques de la casa, ¡con todo tipo de animales!" },
  { id: 7, name: "Crema solar 50+", price: 11.7, category: "Parafarmacia", image: "Gemini_Generated_Image_evzuc8evzuc8evzu.png", description: "Crema solar con factor de protección 50+. Para un día de playa perfecto sin quemaduras" },
  { id: 8, name: "Agua oxigenada", price: 2.15, category: "Desinfección", image: "Gemini_Generated_Image_yl1qovyl1qovyl1q.png", description: "Tarro de 250 mL de agua oxigenada"}
];



export default function PharmacyApp() {
  const [cart, setCart] = useState<Record<number, CartItem>>({});
  const [search, setSearch] = useState("");
  const [showShop, setShowShop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (showShop && searchRef.current) {
    searchRef.current.focus();
  }
}, [showShop]);

  const cartItems = Object.values(cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: prev[product.id]
        ? { ...prev[product.id], quantity: prev[product.id].quantity + 1 }
        : { ...product, quantity: 1 }
    }));
    setToast(`✅ ${product.name} añadido al carrito`);
    setTimeout(() => setToast(null), 2000);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const item = prev[productId];
      if (!item) return prev;
      if (item.quantity > 1) {
        return { ...prev, [productId]: { ...item, quantity: item.quantity - 1 } };
      }
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // — PORTADA —
  if (!showShop) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero con imagen */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src="/products/Gemini_Generated_Image_fhj49qfhj49qfhj4.png"
            alt="Farmacia R. Martínez"
            className="w-full h-full object-cover"
          />
          {/* Degradado oscuro sobre la imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Texto encima de la imagen */}
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <p className="text-sm uppercase tracking-widest text-white-300 mb-2 font-medium">
              Fundada en 1928
            </p>
            <h1 className="text-5xl font-bold mb-3 leading-tight">
              Farmacia <br />del Pilar
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Tu farmacia de confianza en el corazón del barrio. Medicamentos, higiene y cuidado personal con el trato cercano de siempre, ahora también online.
            </p>
          </div>
        </div>

        {/* Sección inferior: buscador + botón */}
        <div className="max-w-2xl mx-auto px-6 py-10 text-center">
          <p className="text-gray-500 mb-6 text-base">
            ¿Buscas algo en concreto? Encuéntralo al momento.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value) setShowShop(true);
              }}
              className="flex-1 p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => setShowShop(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Ver tienda →
            </button>
          </div>
        </div>
      </div>
    );
  }
// — CARRITO —
if (showCart) {
  return (
    <div className="p-6 bg-green-50 min-h-screen max-w-2xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setShowCart(false)}
          className="text-green-700 font-medium hover:underline"
        >
          ← Volver a la tienda
        </button>
        <h1 className="text-3xl font-bold text-green-700">Tu carrito</h1>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => setShowCart(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Ver productos
          </button>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-green-700 font-bold">€{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >−</button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >+</button>
              </div>
              <p className="text-green-700 font-bold w-16 text-right">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow p-6 mt-6">
            <div className="flex justify-between text-gray-500 mb-2">
              <span>Subtotal ({totalCount} productos)</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-4">
              <span>Envío</span>
              <span className="text-green-600">Gratis</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-green-800">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium text-lg">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  // — TIENDA —
  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowShop(false)}
          className="text-green-700 font-medium hover:underline"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold text-green-700">Farmacia Online</h1>
        <div
          className="flex items-center gap-2 text-green-700 cursor-pointer hover:opacity-70"
          onClick={() => setShowCart(true)}
        >
        <span>🛒</span>
        <span>{totalCount}</span>
      </div>
      </header>

      {/* Buscador */}
      <div className="mb-6">
        <input
          ref={searchRef} 
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
          key={product.id} 
          className="rounded-2xl shadow bg-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedProduct(product)}
          >
            <div className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-lg font-bold mt-2 text-green-700">€{product.price}</p>
              <button
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
                onClick={(e) => {
                 e.stopPropagation();
                addToCart(product)
              }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <p className="text-sm text-green-600 font-medium uppercase tracking-wide mb-1">
        {selectedProduct.category}
      </p>
      <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
      <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
      <p className="text-2xl font-bold text-green-700 mb-4">
        €{selectedProduct.price}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl hover:bg-gray-50"
        >
          Cerrar
        </button>
        <button
          onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium"
        >
          Añadir al carrito
        </button>
      </div>
    </div> 
  </div>
)}
{toast && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
              {toast}
            </div>
          )}
    </div>
  );
}