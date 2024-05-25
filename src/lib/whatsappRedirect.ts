import { formatDate, formatPrice } from "@/lib/formatters";

type OrderData = {
  deliveryDate?: Date;
  deliveryTime?: string;
  candleAndKnife?: boolean;
  greetingCard?: boolean;
  complimentaryMsg?: string;
};

// Single "Buy Now" Template
export const redirectToWhatsApp = (name: string, price: number, variant: string, data: OrderData) => {
  const phoneNumber = "+6281394757477";
  const message = `Hello, Lou Patisserie,\n\nI would like to place an order with the following details:\n
  *Order Details:*
  - *Name*: ${name}
  - *Variant*: ${variant}
  - *Price*: ${formatPrice(price)}
  - *Quantity*: 1
  - *Delivery Date*: ${formatDate(data.deliveryDate)}
  - *Delivery Time*: ${data.deliveryTime}
  - *Candle and Knife*: ${data.candleAndKnife ? "Yes" : "No"}
  - *Greeting Card*: ${data.greetingCard ? "Yes" : "No"}
  - *Complimentary Message*: ${data.complimentaryMsg || "No complimentary message"}

  Please let me know if you need any further information.

  Thank you!
  `;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};

// Cart Template
type CartItem = {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  candleAndKnife: boolean;
  greetingCard: boolean;
  complimentaryMsg: string;
  totalPrice?: number;
  imgSrc?: string;
};

export const redirectToWhatsAppCart = (cartItems: CartItem[], cumulativeTotalPrice: number) => {
  const phoneNumber = "+6281394757477";
  let message = `Hi Lou Patisserie,\n\nI would like to place an order with the following details:\n\n`;

  cartItems.forEach((item, index) => {
    message += `*Product ${index + 1}:*\n`;
    message += `- *Name*: ${item.name}\n`;
    message += `- *Variant*: ${item.variant}\n`;
    message += `- *Price*: ${formatPrice(item.price)}\n`;
    message += `- *Quantity*: ${item.quantity}\n`;
    message += `- *Total Price*: ${formatPrice(item.totalPrice)}\n`;
    message += `- *Delivery Date*: ${formatDate(item.deliveryDate)}\n`;
    message += `- *Delivery Time*: ${item.deliveryTime}\n`;
    message += `- *Candle & Knife*: ${item.candleAndKnife ? "Yes" : "No"}\n`;
    message += `- *Greeting Card*: ${item.greetingCard ? "Yes" : "No"}\n`;
    message += `- *Complimentary Message*: ${item.complimentaryMsg || "No complimentary message"}\n\n`;
  });

  message += `*Cumulative Total Price*: ${formatPrice(cumulativeTotalPrice)}\n\n`;
  message += `Please let me know if you need any further information.\n\nThank you!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};
