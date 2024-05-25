import { formatDate, formatPrice } from "@/lib/formatters";

type OrderData = {
  deliveryDate?: Date;
  deliveryTime?: string;
  candleAndKnife?: boolean;
  greetingCard?: boolean;
  complimentaryMsg?: string;
};

export const redirectToWhatsApp = (name: string, price: number, variant: string, data: OrderData) => {
  const phoneNumber = "+6281394757477";
  const message = 
  `Hi Lou Patisserie,
  I would like to place an order with the following details:

  *Order Details:*
  - *Product*: ${name}
  - *Variant*: ${variant}
  - *Price*: ${formatPrice(price)}
  - *Quantity*: 1
  - *Delivery Date*: ${formatDate(data.deliveryDate)}
  - *Delivery Time*: ${data.deliveryTime}
  - *Candle and Knife*: ${data.candleAndKnife ? "Yes" : "No"}
  - *Greeting Card*: ${data.greetingCard ? "Yes" : "No"}
  - *Complimentary Message*: ${data.complimentaryMsg || "No message"}

  Please let me know if you need any further information.

  Thank you!
  `;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};
