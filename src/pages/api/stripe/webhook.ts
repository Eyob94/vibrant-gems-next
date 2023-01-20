import { buffer } from "micro";
import getRawBody from "raw-body";
import { stripe } from "../../../config/stripe";
import { getPendingOrder } from "../../../utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create req buffer
    const rawBody = await getRawBody(req);

    // // Parsed body
    // const parsedBody = JSON.parse(reqBuffer.toString());

    // // Parsed metadata details
    // const parsedMetadataDetails = JSON.parse(
    //   parsedBody.data.object.metadata.details
    // );

    // // Get pending order id
    // const orderId = parsedMetadataDetails.orderId;

    // // Check if the company is Vibrant Gems
    // const isVibrantGems = parsedMetadataDetails.company === "vibrantgems";

    // Signature
    const signature = req.headers["stripe-signature"] as string;

    try {
      // Product event config
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );

      // Parsed metadata details
      const parsedMetadataDetails = JSON.parse(
        //@ts-ignore
        event.data.object.metadata.details
      );

      // Get pending order id
      const orderId = parsedMetadataDetails.orderId;

      // Check if the company is Vibrant Gems
      const isVibrantGems = parsedMetadataDetails.company === "vibrantgems";

      // Handle the event
      if (
        (event.type === "charge.succeeded" && isVibrantGems) ||
        (event.type === "payment_intent.succeeded" && isVibrantGems) ||
        (event.type === "checkout.session.completed" && isVibrantGems)
      ) {
        // Get pending orders
        const pendingOrder = await getPendingOrder(res, orderId);

        if (pendingOrder) {
          // Create updated orders
          const updatedOrder = {
            status: "PROCESSING",
            totalPrice: pendingOrder.attributes.totalPrice,
            items: JSON.stringify(pendingOrder.attributes.items),
          };

          try {
            // Update orders status
            await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${pendingOrder.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: updatedOrder }),
              }
            );

            // Send the response
            res.status(201).json("Orders status updated");
          } catch (err) {
            console.log(err);
            res.status(500).json("Failed update oder status");
          }
        }
      } else if (event.type === "checkout.session.expired" && isVibrantGems) {
        // Get the pending order
        const pendingOrder = await getPendingOrder(res, orderId);

        if (pendingOrder) {
          try {
            // Delete the pending order
            await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${pendingOrder.id}`,
              {
                method: "DELETE",
              }
            );

            // Send the response
            res.status(201).json("Orders deleted");
          } catch (err) {
            console.log(err);
            res.status(500).json("Failed to delete order");
          }
        }
      }
    } catch (err) {
      // If event fails to create
      console.log("Stripe event verification failed");
      res.status(500).json("Stripe event verification failed");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// Turn body parser off
export const config = {
  api: {
    bodyParser: false,
  },
};
