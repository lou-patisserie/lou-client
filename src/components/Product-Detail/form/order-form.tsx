"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { startOfDay } from "date-fns";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/UI/calendar";
import { Button } from "@/components/UI/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";
import { Checkbox } from "@/components/UI/checkbox";
import { FormSchema } from "./validationSchema";
import { Textarea } from "@/components/UI/textarea";
import { useEffect, useState } from "react";
import ProductDrawer from "./product-drawer";
import { formatPrice } from "@/lib/formatters";
import { redirectToWhatsApp } from "../../../lib/whatsappRedirect";
import { AddOns } from "@/types/data-types";
import { Skeleton } from "@/components/UI/skeleton";
import { Input } from "@/components/UI/input";

type Props = {
  id: string;
  name?: string;
  price: number;
  imgSrc?: string;
  selectedVariantName: string;
  addOns: AddOns[];
  addOnsNull: boolean;
  loading?: boolean;
};

export default function OrderForm({ id, name = "", price, selectedVariantName, imgSrc = "", addOns, addOnsNull, loading }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);
  const [productToAdd, setProductToAdd] = useState({
    id: "",
    name: "",
    price: 0,
    variant: "",
    quantity: 0,
    deliveryDate: new Date(),
    deliveryTime: "",
    addOns: {},
    complimentaryMsg: "",
    imgSrc: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      addOns: addOns.reduce((acc, addOn) => {
        acc[addOn.name] = {
          selected: false,
          price: parseFloat(addOn.price),
          name: addOn.name,
          main_image: addOn.main_image,
          ID: addOn.ID,
        };
        return acc;
      }, {} as Record<string, { selected: boolean; price: number; name: string; main_image: string; ID: string }>),
    },
  });

  const handleAddOnChange = (addOnName: string, isSelected: boolean) => {
    const addOn = addOns.find((addOn) => addOn.name === addOnName);
    const addOnPrice = addOn ? parseFloat(addOn.price) : 0;
    const name = addOn ? addOn.name : "";
    const main_image = addOn ? addOn.main_image : "";
    const addOnId = addOn ? addOn.ID : "";
    form.setValue(`addOns.${addOnName}`, {
      selected: isSelected,
      price: isSelected ? addOnPrice : 0,
      name: isSelected ? name : "",
      main_image: isSelected ? main_image : "",
      ID: isSelected ? addOnId : "",
    });
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const selectedAddOns = Object.entries(form.getValues().addOns || {}).filter(([_, details]) => details.selected);
      const addOnsTotal = selectedAddOns.reduce((sum, [_, details]) => sum + details.price, 0);
      setTotalPrice(price + addOnsTotal);
    };

    calculateTotalPrice();

    const subscription = form.watch(() => {
      calculateTotalPrice();
    });

    return () => subscription.unsubscribe();
  }, [form, price, addOns]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newProductToAdd = {
      id: id || Math.random().toString(),
      name: name || "",
      price: price,
      variant: selectedVariantName,
      quantity: 1,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
      complimentaryMsg: data.complimentaryMsg || "",
      addOns: data.addOns || {},
      imgSrc: imgSrc || "",
    };

    setProductToAdd(newProductToAdd);
    if (isBuyNow) {
      redirectToWhatsApp(name || "", price, selectedVariantName, {
        ...data,
        addOns: data.addOns || {},
        totalPrice: totalPrice,
      });
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
                      <Button
                        name="date-btn"
                        variant={"outline"}
                        className={cn("w-72 md:w-96 pl-3 text-left font-normal hover:bg-luoBiege rounded-none", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-none" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => startOfDay(date) < startOfDay(new Date())}
                      initialFocus
                    />
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
          <div>
            <FormLabel>Add-Ons (Optional)</FormLabel>
            <FormDescription className="text-xs">Select the add-ons that you want.</FormDescription>
          </div>
          {loading ? (
            <Skeleton className="w-full max-w-96 h-7 my-2" />
          ) : addOnsNull ? (
            <Input className="rounded-none focus-visible:ring-luoDarkBiege " type="text" readOnly value="Add-ons not available" />
          ) : (
            addOns.map((addOn) => (
              <div key={addOn.ID} className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name={`addOns.${addOn.name}.selected`}
                  render={({ field }) => (
                    <FormItem className="flex w-72 md:w-96 flex-row items-start space-x-2 space-y-0 rounded-none border px-4 py-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(isChecked: any) => handleAddOnChange(addOn.name, isChecked)}
                          className="rounded-none"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          {addOn.name} - {formatPrice(parseFloat(addOn.price))}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))
          )}
          <FormField
            control={form.control}
            name="complimentaryMsg"
            render={({ field }) => (
              <FormItem className="flex flex-col w-72 md:w-96">
                <FormLabel>Complimentary Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here, We do not write on the cake"
                    className="resize-none focus-visible:ring-luoDarkBiege rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button
              name="order-submit"
              type="submit"
              className="bg-luoDarkBiege hover:bg-[#a58b73] rounded-none transition ease-in-out duration-150"
              onClick={() => setIsBuyNow(true)}>
              Buy Now - {formatPrice(totalPrice)}
            </Button>
            <Button
              name="order-submit"
              type="submit"
              className="bg-luoBiege text-luoDarkBiege hover:bg-[#e8dbca] rounded-none transition ease-in-out duration-150"
              onClick={() => setIsBuyNow(false)}>
              Add to Cart
            </Button>
          </div>
        </form>
      </Form>
      <ProductDrawer onOpenDrawer={isDrawerOpen} setOpenDrawer={setDrawerOpen} productToAdd={productToAdd} />
    </>
  );
}
