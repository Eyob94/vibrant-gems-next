import { buffer } from "micro";
import { stripe } from "../../../config/stripe";
import { getPendingOrder } from "../../../utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create req buffer
    const reqBuffer = await buffer(req);

    // Parsed body
    const parsedBody = JSON.parse(reqBuffer.toString());

    // Parsed metadata details
    const parsedMetadataDetails = JSON.parse(
      parsedBody.data.object.metadata.details
    );

    // Check if the company is Vibrant Gems
    const isVibrantGems = parsedMetadataDetails.company === "vibrantgems";

    // Get pending order id
    const pendingId = parsedMetadataDetails.pendingId;

    // Signature
    const signature = req.headers["stripe-signature"] as string;

    try {
      // Product event config
      const event = stripe.webhooks.constructEvent(
        reqBuffer.toString("utf8"),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );

      // Handle the event
      if (
        (event.type === "charge.succeeded" && isVibrantGems) ||
        (event.type === "payment_intent.succeeded" && isVibrantGems) ||
        (event.type === "checkout.session.completed" && isVibrantGems)
      ) {
        // Get pending orders
        const pendingOrder = await getPendingOrder(pendingId);

        if (pendingOrder) {
          // Create updated orders
          const updatedOrder = {
            status: "PROCESSING",
            pendingId: pendingOrder.attributes.pendingId,
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
          }
        }
      } else if (event.type === "checkout.session.expired" && isVibrantGems) {
        // Get the pending order
        const pendingOrder = await getPendingOrder(pendingId);

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

// Turn body parser off
export const config = {
  api: {
    bodyParser: false,
  },
};
