'use client'
import { products } from "./products"

interface Product {
  id: number,
  name: string,
  price: number,
  image: string
}

function page() {

  const  handlePay = async (product: Product ) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }

    })
    const session = await res.json()
    window.location = session.url;
  }

  return (
    <div className="px-44">
      <h1 className="text-3xl font-bold text-center my-10">Products</h1>
      <div className="grid grid-cols-3 gap-10">
        {products.map(product => 
          (
            <div key={product.id} className="bg-slate-800 text-center p-4 rounded-md text-white">
              <h2 className="font-bold text-3xl">{product.name}</h2>
              <p>${product.price/10}</p>
              <img src={product.image} alt={product.image} className="w-full"/>
              <button 
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
              onClick={() => handlePay(product)}
              >
                Pay
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default page