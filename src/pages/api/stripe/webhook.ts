import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

// Configure stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

interface IOrder {
  orderId: string;
  itemName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  status: string;
  itemDescription: string;
  pendingOrderId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Parsed body
    const parsedBody = JSON.parse(req.body);

    // Parsed metadata details
    const parsedMetadataDetails = JSON.parse(
      parsedBody.data.object.metadata.details
    );

    // Check if the company is ciseco
    const isCiseco = parsedMetadataDetails.company === "ciseco";

    // Get pending order id
    const pendingOrderId = parsedMetadataDetails.pendingOrderId;

    // Signature
    const signature = req.headers["stripe-signature"] as string;

    try {
      // Product event config
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );

      // Handle the event
      if (
        (event.type === "charge.succeeded" && isCiseco) ||
        (event.type === "payment_intent.succeeded" && isCiseco) ||
        (event.type === "checkout.session.completed" && isCiseco)
      ) {
        try {
          // Get all orders
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`,
            { method: "GET" }
          ).then((res) => res.json());

          const allOrders: IOrder[] = response.data;

          // Get pending orders
          const pendingOrders = allOrders
            .filter(
              (order) =>
                order.status === "PENDING" &&
                order.pendingOrderId === pendingOrderId
            )
            .map((pendingOrder) => ({ ...pendingOrder, status: "PROCESSING" }));

          try {
            await Promise.all(
              pendingOrders.map(
                async (pendingOrder) =>
                  await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${pendingOrder.orderId}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ data: pendingOrder }),
                    }
                  )
              )
            );

            // Send the response
            res.status(201).json("Orders status updated");
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      } else if (event.type === "checkout.session.expired" && isCiseco) {
        try {
          // Get all orders
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`,
            { method: "GET" }
          ).then((res) => res.json());

          const allOrders: IOrder[] = response.data;

          // Get pending orders
          const pendingOrders = allOrders
            .filter(
              (order) =>
                order.status === "PENDING" &&
                order.pendingOrderId === pendingOrderId
            )
            .map((pendingOrder) => ({ ...pendingOrder, status: "PROCESSING" }));

          try {
            await Promise.all(
              pendingOrders.map(
                async (pendingOrder) =>
                  await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${pendingOrder.orderId}`,
                    {
                      method: "DELETE",
                    }
                  )
              )
            );

            // Send the response
            res.status(201).json("Orders deleted");
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      // If event fails to create
      console.log("Stripe event verification failed");
      throw err;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
