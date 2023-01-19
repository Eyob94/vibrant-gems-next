import crypto from "crypto";

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

// Generate random string
export const generateRandomString = () =>
  crypto.randomBytes(16).toString("hex");

// Get pending orders of a specific session
export async function getPendingOrders(pendingOrderId: string) {
  try {
    // Get all orders
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`,
      { method: "GET" }
    ).then((res) => res.json());

    const orders: IOrder[] = response.data;

    // Get pending orders
    const pendingOrders = orders.filter(
      (order) =>
        order.status === "PENDING" && order.pendingOrderId === pendingOrderId
    );

    // Return pending orders
    return pendingOrders;
  } catch (err) {
    console.log(err);
  }
}
