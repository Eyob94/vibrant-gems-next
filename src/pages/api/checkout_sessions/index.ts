import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "use-shopping-cart/core";
import { generateRandomString } from "../../../utils";

// Configure stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
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

    // Get product ids
    const productsData = products.map((product) => ({
      id: product.id,
      quantity: 1,
    }));

    // Order quantity
    const getOrderQuantity = (product: Product) =>
      productsData.find((productData) => productData.id === product.id)
        ?.quantity;

    try {
      // Get all the products from Strapi
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products`,
        { method: "GET" }
      ).then((res) => res.json());

      const allProducts: Product[] = response.data;

      // Create random order id
      const orderId = generateRandomString();
      const pendingOrderId = generateRandomString();

      // Filter the order items from db items
      const orderItems = allProducts.filter((product) =>
        productsData.some((productData) => productData.id === product.id)
      );

      // Create line items
      const lineItems = orderItems.map((product) => ({
        name: product.attributes.name,
        unit_amount: product.attributes.price,
        quantity: getOrderQuantity(product),
      }));

      try {
        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: lineItems.map((lineItem) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: lineItem.name,
                },
                unit_amount: Math.round(Math.abs(lineItem.unit_amount) * 100),
              },
              quantity: lineItem.quantity,
            };
          }),
          metadata: {
            details: JSON.stringify({ company: "ciseco", pendingOrderId }),
          },
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/checkout`,
        });

        // Create pending  orders
        const pendingOrders = orderItems.map((orderItem) => ({
          orderId,
          itemName: orderItem.attributes.name,
          unitPrice: orderItem.attributes.price,
          quantity: getOrderQuantity(orderItem),
          totalPrice: orderItem.attributes.price * getOrderQuantity(orderItem)!,
          status: "PENDING",
          pendingOrderId,
          itemDescription: orderItem.attributes.description,
        }));

        try {
          // Make request to the backend
          await Promise.all(
            pendingOrders.map(
              async (pendingOrder) =>
                await fetch(
                  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data: pendingOrder }),
                  }
                )
            )
          );

          // Send the session url with response
          res.status(200).json(session.url);
        } catch (err) {
          res.status(500).json({
            statusCode: 500,
            message: "Failed to create orders",
          });
        }
      } catch (err) {
        res.status(500).json({
          statusCode: 500,
          message: "Failed to create checkout session",
        });
      }
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed to get orders",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
