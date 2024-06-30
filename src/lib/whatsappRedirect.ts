import { formatDate, formatPrice } from "@/lib/formatters";
import { CartItem } from "@/types/data-types";

type OrderData = {
  deliveryDate?: Date;
  deliveryTime?: string;
  addOns: Record<string, { selected: boolean; price: number }>;
  complimentaryMsg?: string;
  totalPrice: number;
};

// Single "Buy Now" Template
export const redirectToWhatsApp = (name: string, price: number, variant: string, data: OrderData) => {
  const phoneNumber = "+6281110019906";
  const selectedAddOns =
    Object.keys(data.addOns)
      .filter((key) => data.addOns[key].selected)
      .map((key) => {
        const addOn = data.addOns[key];
        return `${key} (${formatPrice(addOn.price)})`;
      })
      .join(", ") || "No Add-Ons";

  const message = `Hello, Lou Patisserie,\n\nI would like to place an order with the following details:\n
  *Order Details:*
  - *Name*: ${name}
  - *Variant*: ${variant}
  - *Cake Price*: ${formatPrice(price)}
  - *Quantity*: 1
  - *Delivery Date*: ${formatDate(data.deliveryDate)}
  - *Delivery Time*: ${data.deliveryTime}
  - *Add-Ons*: ${selectedAddOns}
  - *Complimentary Message*: ${data.complimentaryMsg || "No complimentary message"}

  *Total Price*: ${formatPrice(data.totalPrice)}

  Please let me know if you need any further information.

  Thank you!
  `;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};

// Bulk Products Redirect WA msgs
export const redirectToWhatsAppCart = (cartItems: CartItem[], cumulativeTotalPrice: number) => {
  const phoneNumber = "+6281110019906";
  let message = `Hi Lou Patisserie,\n\nI would like to place an order with the following details:\n\n`;

  cartItems.forEach((item, index) => {
    message += `*Product ${index + 1}:*\n`;
    message += `- *Name*: ${item.name}\n`;

    if (item.variant) {
      message += `- *Variant*: ${item.variant}\n`;
    }

    message += `- *Price*: ${formatPrice(item.price)}\n`;
    message += `- *Quantity*: ${item.quantity}\n`;

    if (item.deliveryDate) {
      message += `- *Delivery Date*: ${formatDate(item.deliveryDate)}\n`;
    }

    if (item.deliveryTime) {
      message += `- *Delivery Time*: ${item.deliveryTime}\n`;
    }

    if (item.complimentaryMsg) {
      message += `- *Complimentary Message*: ${item.complimentaryMsg}\n`;
    }

    message += `- *Total Product Price*: ${formatPrice(item.totalPrice)}\n\n`;
  });

  message += `*Cumulative Total Price*: ${formatPrice(cumulativeTotalPrice)}\n\n`;
  message += `Please let me know if you need any further information.\n\nThank you!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};

export const redirectToWhatsAppAddOns = (name: string, price: number, data: OrderData) => {
  const phoneNumber = "+6281110019906";
  let message = `Hi Lou Patisserie,\n\nI would like to place an order with the following details:\n\n`;

  message += `*Add-Ons Name:* ${name}\n`;
  message += `*Price:* ${price}\n`;

  if (data.deliveryDate) {
    message += `*Delivery Date:* ${formatDate(data.deliveryDate)}\n`;
  }

  if (data.deliveryTime) {
    message += `*Delivery Time:* ${data.deliveryTime}\n`;
  }

  if (data.complimentaryMsg) {
    message += `*Complimentary Message:* ${data.complimentaryMsg}\n`;
  }

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};
