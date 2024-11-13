// app/page.js
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { decrement, increment } from "../../store/counterSlice";
import { addItem, removeItem } from "../../store/cartSlice";
import { setLoading } from "../../store/loadingSlice";

// import AddToCartButton from "./components/AddToCartButton";
// import Cart from "./components/Cart";

const products = [
  { id: 1, name: "Product 1", quantity: 1, price: 10.000 },
  { id: 2, name: "Product 2", quantity: 1, price: 20.000 },
];

export default function Home() {

  const count = useSelector((state: RootState) => state.counter.value);
  const cart = useSelector((state: RootState) => state.cart.items);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const dispatch = useDispatch();

  return (
    <div className="px-16">
      <div className="flex gap-8">
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center my-8">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow flex flex-col gap-8">
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">${product.quantity}</p>
            {/* <AddToCartButton item={product} /> */}
            <button aria-label="Decrement value" onClick={() => dispatch(addItem(product))}>
              Add cart
            </button>
            <button aria-label="Decrement value" onClick={() => dispatch(removeItem(product.id))}>
              remove cart
            </button>
          </div>
        ))}
      </div>

      <div className="my-8">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <h1>{item.id}</h1>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-lime-900">
        <button aria-label="Decrement value" onClick={() => dispatch(setLoading(!isLoading))}>
          Loading
        </button>
        {isLoading ? "true" : "false"}
      </div>
    </div>
  );
}
