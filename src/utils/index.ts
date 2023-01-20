import crypto from "crypto";

// Generate random string
export const generateRandomString = () =>
  crypto.randomBytes(16).toString("hex");

// Get pending order of a specific session
export async function getPendingOrder(pendingId: string) {
  try {
    // Make request to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders?filters[status][$eq]=PENDING&filters[pendingId][$eq]=${pendingId}`,
      { method: "GET" }
    ).then((res) => res.json());

    // Return the pending order
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
