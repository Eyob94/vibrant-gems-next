import { Product } from "use-shopping-cart/core";
import { stripe } from "../../../config/stripe";
import { generateRandomString } from "../../../utils";
import { NextApiRequest, NextApiResponse } from "next";

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

    // Find order quantity
    const getOrderQuantity = (product: Product) =>
      productsData.find((productData) => productData.id === product.id)
        ?.quantity;

    try {
      // Get all the products from Strapi
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products`,
        { method: "GET" }
      ).then((res) => res.json());

      // All products
      const allProducts: Product[] = response.data;

      // Create random order id
      const pendingId = generateRandomString();

      // Filter the order items from db items
      const orderProducts = allProducts.filter((product) =>
        productsData.some((productData) => productData.id === product.id)
      );

      // Create line items
      const lineItems = orderProducts.map((orderProduct) => ({
        name: orderProduct.attributes.name,
        price: orderProduct.attributes.price,
        quantity: getOrderQuantity(orderProduct),
        description: orderProduct.attributes.description,
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
                unit_amount: Math.round(Math.abs(lineItem.price) * 100),
              },
              quantity: lineItem.quantity,
            };
          }),
          cancel_url: `${req.headers.origin}/checkout`,
          success_url: `${req.headers.origin}/success?session={CHECKOUT_SESSION_ID}`,
        });

        // Create the order
        const order = {
          pendingId,
          status: "PENDING",
          items: JSON.stringify(
            lineItems.map((lineItem) => ({
              name: lineItem.name,
              price: lineItem.price,
              description: lineItem.description,
            }))
          ),
          totalPrice: lineItems.reduce(
            (acc, curr) => acc + curr.price * curr.quantity!,
            0
          ),
        };

        try {
          // Make request to the backend
          await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: order }),
          });

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
