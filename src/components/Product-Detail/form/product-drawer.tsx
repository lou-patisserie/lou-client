"use client";
import { Button } from "@/components/UI/button";
import { Card } from "@/components/UI/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/UI/drawer";
import { toast, useToast } from "@/components/UI/use-toast";
import { formatDate, formatPrice } from "@/lib/formatters";
import { cartState } from "@/recoils/atoms/products";
import { AddOnCartItem, CartItem } from "@/types/data-types";
import { Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  deliveryDate: Date;
  deliveryTime: string;
  addOns: Record<string, { selected: boolean; price: number; name: string; main_image: string, ID: string }>;
  complimentaryMsg: string;
  imgSrc: string;
};

type Props = {
  onOpenDrawer: boolean;
  setOpenDrawer: any;
  productToAdd: ProductProps;
};

export default function ProductDrawer({ onOpenDrawer, setOpenDrawer, productToAdd: initialProduct }: Props) {
  const calculateTotalPrice = (product: ProductProps) => {
    const addOnsTotal = Object.values(product.addOns).reduce((sum, addOn) => {
      return addOn.selected ? sum + addOn.price : sum;
    }, 0);
    return product.price * product.quantity + addOnsTotal;
  };

  const [product, setProduct] = useState(() => ({
    ...initialProduct,
    totalPrice: calculateTotalPrice(initialProduct),
  }));

  const { toast } = useToast();
  const [cart, setCart] = useRecoilState(cartState);
  const router = useRouter();
  // console.log("initial", initialProduct);

  useEffect(() => {
    setProduct({
      ...initialProduct,
      totalPrice: calculateTotalPrice(initialProduct),
    });
  }, [initialProduct]);

  function handleQuantityChange(delta: number) {
    setProduct((prev) => {
      const newQuantity = Math.max(1, prev.quantity + delta);
      return {
        ...prev,
        quantity: newQuantity,
        totalPrice: prev.price * newQuantity + Object.values(prev.addOns).reduce((sum, addOn) => (addOn.selected ? sum + addOn.price : sum), 0),
      };
    });
  }

  function transformProductToCartItems(product: ProductProps): CartItem[] {
    const baseProduct: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      variant: product.variant,
      quantity: product.quantity,
      deliveryDate: product.deliveryDate,
      deliveryTime: product.deliveryTime,
      complimentaryMsg: product.complimentaryMsg,
      totalPrice: product.price * product.quantity,
      imgSrc: product.imgSrc,
    };

    const selectedAddOns: CartItem[] = Object.values(product.addOns)
      .filter((addOn) => addOn.selected)
      .map((addOn) => ({
        id: addOn.ID,
        name: addOn.name,
        price: addOn.price,
        imgSrc: addOn.main_image,
        quantity: 1,
        variant: "", // Placeholder or default value
        complimentaryMsg: "", // Default empty string
        deliveryDate: product.deliveryDate,
        deliveryTime: product.deliveryTime,
        totalPrice: addOn.price,
      }));

    return [baseProduct, ...selectedAddOns];
  }

  function addItemsToCart(cartItems: CartItem[]) {
    setCart((currCart) => {
      const updatedCart = [...currCart];
      cartItems.forEach((newItem) => {
        const existingItemIndex = updatedCart.findIndex((item) => item.id === newItem.id && item.variant === newItem.variant && item.name === newItem.name);

        if (existingItemIndex > -1) {
          const existingItem = updatedCart[existingItemIndex];
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + newItem.quantity,
            totalPrice: existingItem.price * (existingItem.quantity + newItem.quantity),
          };
          updatedCart[existingItemIndex] = updatedItem;
        } else {
          updatedCart.push(newItem);
        }
      });
      return updatedCart;
    });
  }

  function proceedToCheckOut() {
    const cartItems = transformProductToCartItems(product);
    addItemsToCart(cartItems);
    router.push("/checkout");
  }

  function onCancel() {
    setOpenDrawer(false);
  }

  function continueShopping() {
    const cartItems = transformProductToCartItems(product);
    addItemsToCart(cartItems);
    toast({
      title: `${product.name} is added to your cart.`,
      description: (
        <div className="flex flex-col gap-0">
          <span>Feel free to keep browsing.</span>
          <span>Check out your cart whenever you're ready!</span>
        </div>
      ),
      duration: 5000,
      variant: "default",
    });
  }

  return (
    <Drawer open={onOpenDrawer} onOpenChange={setOpenDrawer}>
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <Card className="p-4">
              <div className="flex flex-row justify-between items-center">
                <DrawerTitle className="text-luoDarkBiege">{product.name}</DrawerTitle>
                <Button variant="destructive" className="h-6 m-0 text-xs p-1 rounded-none" onClick={onCancel}>
                  <X size={18} strokeWidth={3} />
                </Button>
              </div>

              <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
              <DrawerDescription className="italic font-semibold text-luoDarkBiege mb-1">Here your details: </DrawerDescription>
              <DrawerDescription>
                <strong>Variant</strong> {product.variant}
              </DrawerDescription>
              <DrawerDescription>
                <strong>Price:</strong> {formatPrice(product.price)}
              </DrawerDescription>
              <DrawerDescription>
                <strong>Delivery:</strong> {formatDate(product.deliveryDate)} at {product.deliveryTime}
              </DrawerDescription>
              <DrawerDescription className="italic font-semibold text-luoDarkBiege my-1">Your Add Ons: </DrawerDescription>
              <div className="flex flex-wrap justify-between gap-1">
                {Object.entries(product.addOns).filter(([_, details]) => details.selected).length > 0 ? (
                  Object.entries(product.addOns)
                    .filter(([_, details]) => details.selected)
                    .map(([addOn, details]) => (
                      <DrawerDescription key={addOn}>
                        <strong>{addOn}:</strong> {formatPrice(details.price)}
                      </DrawerDescription>
                    ))
                ) : (
                  <DrawerDescription>No Add Ons</DrawerDescription>
                )}
              </div>
              <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
              <div>
                <DrawerDescription className="italic font-semibold text-luoDarkBiege">Complimentary Message:</DrawerDescription>
                <DrawerDescription>{product.complimentaryMsg}</DrawerDescription>
              </div>

              <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
              <div className="flex items-center justify-center space-x-2">
                <Button onClick={() => handleQuantityChange(-1)} disabled={product.quantity <= 1} variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-5xl font-bold tracking-tighter text-luoDarkBiege">{product.quantity}</div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">Quantity</div>
                </div>
                <Button onClick={() => handleQuantityChange(1)} variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
              <DrawerDescription className="text-end">
                <strong>Total Price:</strong> {formatPrice(product.totalPrice)}
              </DrawerDescription>
            </Card>
          </DrawerHeader>
          <DrawerFooter className="flex flex-row w-full">
            <DrawerClose asChild>
              <Button variant="outline" className="rounded-none" onClick={continueShopping}>
                Add to Cart
              </Button>
            </DrawerClose>
            <Button className="w-full rounded-none bg-luoDarkBiege hover:bg-luoDarkBiege hover:opacity-75" onClick={proceedToCheckOut}>
              Checkout
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Dynamic calcualte total price with add ons

// export default function ProductDrawer({ onOpenDrawer, setOpenDrawer, productToAdd: initialProduct }: Props) {
//   const [product, setProduct] = useState(() => {
//     const addOnsTotal = Object.values(initialProduct.addOns).reduce((sum, addOn) => {
//       return addOn.selected ? sum + addOn.price : sum;
//     }, 0);
//     return {
//       ...initialProduct,
//       totalPrice: (initialProduct.price + addOnsTotal) * initialProduct.quantity,
//     };
//   });

//   const { toast } = useToast();
//   const [cart, setCart] = useRecoilState(cartState);
//   const router = useRouter();

//   useEffect(() => {
//     const addOnsTotal = Object.values(initialProduct.addOns).reduce((sum, addOn) => {
//       return addOn.selected ? sum + addOn.price : sum;
//     }, 0);
//     setProduct({
//       ...initialProduct,
//       totalPrice: (initialProduct.price + addOnsTotal) * initialProduct.quantity,
//     });
//   }, [initialProduct]);

//   function handleQuantityChange(delta: number) {
//     setProduct((prev) => {
//       const newQuantity = Math.max(1, prev.quantity + delta);
//       const addOnsTotal = Object.values(prev.addOns).reduce((sum, addOn) => {
//         return addOn.selected ? sum + addOn.price : sum;
//       }, 0);
//       return {
//         ...prev,
//         quantity: newQuantity,
//         totalPrice: (prev.price + addOnsTotal) * newQuantity,
//       };
//     });
//   }

//   function proceedToCheckOut() {
//     setCart([...cart, product]);
//     router.push("/checkout");
//   }

//   function onCancel() {
//     setOpenDrawer(false);
//   }

//   function continueShopping() {
//     setCart([...cart, product]);
//     toast({
//       title: `${product.name} is added to your cart.`,
//       description: (
//         <div className="flex flex-col gap-0">
//           <span>Feel free to keep browsing.</span>
//           <span>Check out your cart whenever you're ready!</span>
//         </div>
//       ),
//       duration: 5000,
//       variant: "default",
//     });
//   }

//   return (
//     <Drawer open={onOpenDrawer} onOpenChange={setOpenDrawer}>
//       <DrawerContent>
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <Card className="p-4">
//               <div className="flex flex-row justify-between items-center">
//                 <DrawerTitle className="text-luoDarkBiege">{product.name}</DrawerTitle>
//                 <Button variant="destructive" className="h-6 m-0 text-xs p-1 rounded-none" onClick={onCancel}>
//                   <X size={18} strokeWidth={3} />
//                 </Button>
//               </div>

//               <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
//               <DrawerDescription className="italic font-semibold text-luoDarkBiege mb-1">Here your details: </DrawerDescription>
//               <DrawerDescription>
//                 <strong>Variant</strong> {product.variant}
//               </DrawerDescription>
//               <DrawerDescription>
//                 <strong>Price:</strong> {formatPrice(product.price)}
//               </DrawerDescription>
//               <DrawerDescription>
//                 <strong>Delivery:</strong> {formatDate(product.deliveryDate)} at {product.deliveryTime}
//               </DrawerDescription>
//               <DrawerDescription className="italic font-semibold text-luoDarkBiege my-1">Your Add Ons: </DrawerDescription>
//               <div className="flex flex-wrap justify-between gap-1">
//                 {Object.entries(product.addOns)
//                   .filter(([_, details]) => details.selected)
//                   .map(([addOn, details]) => (
//                     <DrawerDescription key={addOn}>
//                       <strong>{addOn}:</strong> {formatPrice(details.price)}
//                     </DrawerDescription>
//                   ))}
//               </div>
//               <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
//               <div>
//                 <DrawerDescription className="italic font-semibold text-luoDarkBiege">Complimentary Message:</DrawerDescription>
//                 <DrawerDescription>{product.complimentaryMsg}</DrawerDescription>
//               </div>

//               <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
//               <div className="flex items-center justify-center space-x-2">
//                 <Button onClick={() => handleQuantityChange(-1)} disabled={product.quantity <= 1} variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
//                   <Minus className="h-4 w-4" />
//                   <span className="sr-only">Decrease</span>
//                 </Button>
//                 <div className="flex-1 text-center">
//                   <div className="text-5xl font-bold tracking-tighter text-luoDarkBiege">{product.quantity}</div>
//                   <div className="text-[0.70rem] uppercase text-muted-foreground">Quantity</div>
//                 </div>
//                 <Button onClick={() => handleQuantityChange(1)} variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
//                   <Plus className="h-4 w-4" />
//                   <span className="sr-only">Increase</span>
//                 </Button>
//               </div>
//               <div className="w-full h-[2px] bg-slate-200 opacity-50 my-2" />
//               <DrawerDescription className="text-end">
//                 <strong>Total Price:</strong> {formatPrice(product.totalPrice)}
//               </DrawerDescription>
//             </Card>
//           </DrawerHeader>
//           <DrawerFooter className="flex flex-row w-full">
//             <DrawerClose asChild>
//               <Button variant="outline" className="rounded-none" onClick={continueShopping}>
//                 Add to Cart
//               </Button>
//             </DrawerClose>
//             <Button className="w-full rounded-none bg-luoDarkBiege hover:bg-luoDarkBiege hover:opacity-75" onClick={proceedToCheckOut}>
//               Checkout
//             </Button>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }
