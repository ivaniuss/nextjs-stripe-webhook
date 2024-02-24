import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

export const POST = async (request:any) => {
  const body = await request.json();
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name, 
            images: [body.image],
          },
          unit_amount: body.price/10,
        },
        quantity: 1
      }
    ],
    metadata: {
      productId: body.id 
   },
    mode: "payment",
  })
  return NextResponse.json(session);
}