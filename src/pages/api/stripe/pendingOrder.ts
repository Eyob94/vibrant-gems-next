import { getPendingOrder } from "../../../utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const pendingOrder = await getPendingOrder("22");

    const updatedOrder = {
      status: "PROCESSING",
      totalPrice: pendingOrder.attributes.totalPrice,
      items: JSON.stringify(pendingOrder.attributes.items),
    };

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

    res.status(200).json(updatedOrder);
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
