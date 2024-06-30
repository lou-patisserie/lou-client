"use client";
import { useRecoilState } from "recoil";
import { Card } from "../UI/card";
import { cartState } from "@/recoils/atoms/products";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./scss/cart-items.module.scss";
import { formatDate, formatPrice } from "@/lib/formatters";
import { Button } from "../UI/button";
import { Minus, Plus } from "lucide-react";
import { EmptyCartSVG } from "../UI/Svg/svg-ui";
import Link from "next/link";
import DeleteCartItem from "./cart-item-delete";
import { redirectToWhatsAppCart } from "@/lib/whatsappRedirect";
import { validateImageUrl } from "@/lib/imgUtils";

export default function CartItems() {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  console.log(cartItems);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold tracking-wide text-luoDarkBiege">Order Details</h2>
          <div className="w-full h-[2px] bg-slate-200 opacity-50 my-4" />
          <div className="w-full flex justify-center items-center text-center flex-col">
            <div className="h-72 w-96 ">
              <EmptyCartSVG />
            </div>
            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-none border shadow-md">
              <h1 className="font-titleFont text-xl font-bold uppercase">Your Cart feels lonely.</h1>
              <p className="text-sm text-center px-10 -mt-2">Your Shopping cart lives to serve. Give it purpose - fill it with delicious cake. and make it happy.</p>
              <Link href="/collection/all-product">
                <button className="bg-luoDarkBiege rounded-none cursor-pointer hover:opacity-75 active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        const newTotalPrice = item.price * newQuantity;
        return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const cumulativeTotalPrice = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-semibold tracking-wide text-luoDarkBiege">Cart:</h2>
        <div className="w-full h-[2px] bg-slate-200 opacity-50 my-4" />
        {cartItems.map((item) => (
          <Card key={item.id} className="my-2 p-4 ">
            <div className="flex flex-wrap gap-2  justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <div className="h-20 w-20">{item.imgSrc ? <Image src={validateImageUrl(item.imgSrc)} width={100} height={100} alt={item.name} className="aspect-square object-cover " /> : <div></div>}</div>
                <div className={`flex flex-col ${classes.cardItems}`}>
                  <p className="font-medium text-base">{item.name}</p>
                  {item.variant && <span className="italic">Variant: {item.variant}</span>}
                  <span className="italic">Price: {formatPrice(item.price)}</span>
                  <span>Date: {formatDate(item.deliveryDate)}</span>
                  <span>When: {item.deliveryTime}</span>
                </div>
              </div>
              <div>
                <DeleteCartItem onDelete={handleDeleteItem} itemId={item.id} name={item.name} />
              </div>
            </div>
            <div className="w-full h-[2px] bg-slate-200 opacity-50 my-4" />
            <div className="flex flex-wrap justify-between">
              <div className="flex items-center justify-center space-x-2">
                <Button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1} variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-xl font-bold tracking-tighter text-luoDarkBiege">{item.quantity}</div>
                </div>
                <Button onClick={() => handleQuantityChange(item.id, 1)} variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <span>Total Price: {formatPrice(item.totalPrice || 0)}</span>
            </div>
          </Card>
        ))}
        <Card className="my-4 p-4">
          <div className="text-lg font-semibold w-full flex flex-wrap justify-between">
            <span>Total Cart Price:</span>
            <span> {formatPrice(cumulativeTotalPrice)}</span>
          </div>
        </Card>
        <Button className="w-full text-base tracking-wide py-6 rounded-none bg-luoDarkBiege hover:bg-luoDarkBiege hover:opacity-75" onClick={() => redirectToWhatsAppCart(cartItems, cumulativeTotalPrice)}>
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
}
