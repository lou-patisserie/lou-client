"use client";
import { Button } from "@/components/UI/button";
import { Calendar } from "@/components/UI/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";
import { Textarea } from "@/components/UI/textarea";
import { formatPrice } from "@/lib/formatters";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddOnFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { redirectToWhatsAppAddOns } from "@/lib/whatsappRedirect";
import AddOnDrawer from "./addon-drawer.tsx";

type Props = {
  id: string;
  name?: string;
  price: number;
  imgSrc?: string;
  loading?: boolean;
};

export default function AddOnOrderForm({ id, name = "", price, imgSrc, loading }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [productToAdd, setProductToAdd] = useState({
    id: "",
    name: "",
    price: 0,
    variant: "",
    quantity: 0,
    deliveryDate: new Date(),
    deliveryTime: "",
    complimentaryMsg: "",
    imgSrc: "",
    totalPrice: price,
  });

  const form = useForm<z.infer<typeof AddOnFormSchema>>({
    resolver: zodResolver(AddOnFormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof AddOnFormSchema>) {
    const newProductToAdd = {
      id: id || Math.random().toString(),
      name: name || "",
      price: price,
      variant: "",
      quantity: 1,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
      complimentaryMsg: data.complimentaryMsg || "",
      imgSrc: imgSrc || "",
      addOns: {},
      totalPrice: price,
    };

    setProductToAdd(newProductToAdd);
    if (isBuyNow) {
      redirectToWhatsAppAddOns(name || "", price, newProductToAdd);
    } else {
      setDrawerOpen(true);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-72 md:w-96">
                <FormLabel>
                  Delivery/Pickup Date<span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button name="date-btn" variant={"outline"} className={cn("w-72 md:w-96 pl-3 text-left font-normal hover:bg-luoBiege rounded-none", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-none" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => startOfDay(date) < startOfDay(new Date())} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryTime"
            render={({ field }) => (
              <FormItem className="flex flex-col w-72 md:w-96">
                <FormLabel>
                  Time<span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select a verified time to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    <SelectItem className="rounded-none" value="10AM - 1PM">
                      10AM - 1PM
                    </SelectItem>
                    <SelectItem className="rounded-none" value="1PM - 3PM">
                      1PM - 3PM
                    </SelectItem>
                    <SelectItem className="rounded-none" value="3PM - 5PM">
                      3PM - 5PM
                    </SelectItem>
                    <SelectItem className="rounded-none" value="5PM - 7PM">
                      5PM - 7PM
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complimentaryMsg"
            render={({ field }) => (
              <FormItem className="flex flex-col w-72 md:w-96">
                <FormLabel>Complimentary Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your message here, We do not write on the cake" className="resize-none focus-visible:ring-luoDarkBiege rounded-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button name="order-submit" type="submit" className="bg-luoDarkBiege hover:bg-[#a58b73] rounded-none transition ease-in-out duration-150" onClick={() => setIsBuyNow(true)}>
              Buy Now - {formatPrice(price)}
            </Button>
            <Button name="order-submit" type="submit" className="bg-luoBiege text-luoDarkBiege hover:bg-[#e8dbca] rounded-none transition ease-in-out duration-150" onClick={() => setIsBuyNow(false)}>
              Add to Cart
            </Button>
          </div>
        </form>
      </Form>
      <AddOnDrawer onOpenDrawer={isDrawerOpen} setOpenDrawer={setDrawerOpen} productToAdd={productToAdd} />
    </>
  );
}
