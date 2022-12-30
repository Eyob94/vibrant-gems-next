import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { Product } from "use-shopping-cart/core";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const products = req.body.products;
    // const amount: number = req.body.amount;
    const products: Product[] = JSON.parse(req.body);

    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        line_items: products.map((product) => ({
          price_data: {
            currency: "USD",
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${req.headers.origin}${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        })),
        success_url: `${req.headers.origin}`,
        cancel_url: `${req.headers.origin}/checkout`,
      };
      console.log(params);
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
