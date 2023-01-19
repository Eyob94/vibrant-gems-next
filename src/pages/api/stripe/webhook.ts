import Stripe from "stripe";
import { getPendingOrders } from "../../../utils";
import { NextApiRequest, NextApiResponse } from "next";

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
        // Get pending orders
        const pendingOrders = await getPendingOrders(pendingOrderId);

        if (pendingOrders) {
          // Create updated orders
          const updatedOrders = pendingOrders.map((pendingOrder) => ({
            ...pendingOrder,
            status: "PROCESSING",
          }));

          try {
            // Update orders status
            await Promise.all(
              updatedOrders.map(
                async (updatedOrder) =>
                  await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${updatedOrder.orderId}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ data: updatedOrder }),
                    }
                  )
              )
            );

            // Send the response
            res.status(201).json("Orders status updated");
          } catch (err) {
            console.log(err);
          }
        }
      } else if (event.type === "checkout.session.expired" && isCiseco) {
        // Get the pending orders
        const pendingOrders = await getPendingOrders(pendingOrderId);

        if (pendingOrders) {
          try {
            // Delete all pending orders of a specific session
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
