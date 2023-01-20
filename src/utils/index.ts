import crypto from "crypto";

interface IOrder {
  orderId: string;
  itemName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  status: string;
  pendingId: string;
  itemDescription: string;
}

// Generate random string
export const generateRandomString = () =>
  crypto.randomBytes(16).toString("hex");

// Get pending orders of a specific session
export async function getPendingOrders(pendingId: string) {
  try {
    // Get all pending orders
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders?filters[status][$eq]=PENDING&filters[pendingId][$eq]=${pendingId}`,
      { method: "GET" }
    ).then((res) => res.json());

    // Pending orders
    const pendingOrders: IOrder[] = response.data;

    // Return pending orders
    return pendingOrders;
  } catch (err) {
    console.log(err);
  }
}
