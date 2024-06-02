import { formatDate, formatPrice } from "@/lib/formatters";

type OrderData = {
  deliveryDate?: Date;
  deliveryTime?: string;
  addOns: Record<string, { selected: boolean; price: number }>;
  complimentaryMsg?: string;
  totalPrice: number;
};

// Single "Buy Now" Template
export const redirectToWhatsApp = (name: string, price: number, variant: string, data: OrderData) => {
  const phoneNumber = "+6281394757477";
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

// Cart Template
type CartItem = {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  addOns: Record<string, { selected: boolean; variant?: string }>;
  complimentaryMsg: string;
  totalPrice?: number;
  imgSrc?: string;
};

// Bulk Products Redirect WA msgs
export const redirectToWhatsAppCart = (cartItems: CartItem[], cumulativeTotalPrice: number) => {
  const phoneNumber = "+6281394757477";
  let message = `Hi Lou Patisserie,\n\nI would like to place an order with the following details:\n\n`;

  cartItems.forEach((item, index) => {
    const selectedAddOns =
      Object.keys(item.addOns)
        .filter((key) => item.addOns[key].selected)
        .map((key) => {
          const addOn = item.addOns[key];
          return addOn.variant ? `${key} (Variant: ${addOn.variant})` : key;
        })
        .join(", ") || "No add-ons";

    message += `*Product ${index + 1}:*\n`;
    message += `- *Name*: ${item.name}\n`;
    message += `- *Variant*: ${item.variant}\n`;
    message += `- *Price*: ${formatPrice(item.price)}\n`;
    message += `- *Quantity*: ${item.quantity}\n`;
    message += `- *Total Price*: ${formatPrice(item.totalPrice)}\n`;
    message += `- *Delivery Date*: ${formatDate(item.deliveryDate)}\n`;
    message += `- *Delivery Time*: ${item.deliveryTime}\n`;
    message += `- *Add-Ons*: ${selectedAddOns}\n`;
    message += `- *Complimentary Message*: ${item.complimentaryMsg || "No complimentary message"}\n\n`;
  });

  message += `*Cumulative Total Price*: ${formatPrice(cumulativeTotalPrice)}\n\n`;
  message += `Please let me know if you need any further information.\n\nThank you!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};
