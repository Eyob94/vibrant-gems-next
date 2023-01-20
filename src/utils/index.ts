import { NextApiResponse } from "next";
// Get pending order of a specific session
export async function getPendingOrder(res: NextApiResponse, orderId: string) {
  try {
    // Make request to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${orderId}`,
      { method: "GET" }
    ).then((res) => res.json());

    // Return the pending order
    return response.data;
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to get pending order");
  }
}
