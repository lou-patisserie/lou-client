"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/UI/calendar";
import { Button } from "@/components/UI/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";
import { Checkbox } from "@/components/UI/checkbox";
import { FormSchema } from "./validationSchema";
import { Textarea } from "@/components/UI/textarea";
import { useState } from "react";
import ProductDrawer from "./product-drawer";

type Props = {
  id: number;
  name: string;
  price: number;
};

export default function OrderForm({ id, name, price }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState({
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    deliveryDate: new Date(),
    deliveryTime: "",
    candleAndKnife: false,
    greetingCard: false,
    complimentaryMsg: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newProductToAdd = {
      id: id,
      name: name,
      price: price,
      quantity: 1,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
      candleAndKnife: data.candleAndKnife || false,
      greetingCard: data.greetingCard || false,
      complimentaryMsg: data.complimentaryMsg || "",
    };

    setProductToAdd(newProductToAdd);
    // setCart([...cart, newProductToAdd]);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    setDrawerOpen(true);
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
                <FormLabel>Delivery/Pickup Date</FormLabel>
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
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
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
                <FormLabel>Time</FormLabel>
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
          <div>
            <FormLabel>Add-Ons</FormLabel>
            <FormDescription className="text-xs">Select the add-ons that you want.</FormDescription>
          </div>
          <FormField
            control={form.control}
            name="candleAndKnife"
            render={({ field }) => (
              <FormItem className="flex w-72 md:w-96 flex-row items-start space-x-2 space-y-0 rounded-none border px-4 py-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="rounded-none" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Add Candle and Knife</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="greetingCard"
            render={({ field }) => (
              <FormItem className="flex w-72 md:w-96 flex-row items-start space-x-2 space-y-0 rounded-none border px-4 py-3 ">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="rounded-none" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Add Greeting Card</FormLabel>
                </div>
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

          <Button name="order-submit" type="submit" className="bg-luoDarkBiege hover:bg-luoDarkBiege hover:opacity-75 rounded-none">
            Proceed
          </Button>
        </form>
      </Form>
      <ProductDrawer onOpenDrawer={isDrawerOpen} setOpenDrawer={setDrawerOpen} productToAdd={productToAdd} />
    </>
  );
}
