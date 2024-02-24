import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)
const endpointSecret = process.env.STRIPE_SECRET_ENDPOINT as string;

export const POST = async (request:any) => {
  const body = await request.text();
  const headerList = headers();
  const sig:any = headerList.get('stripe-signature');
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({error: error.message}, { status: 400 })
  }
  
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted:any = event.data.object;

      // guardar en una base de datos
      console.log(
        "Consultado producto con id",
        checkoutSessionCompleted.metadata.productId
      );

      // enviar un correo

      console.log({ checkoutSessionCompleted });
      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}