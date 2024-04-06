"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";
import { toast } from "@/components/UI/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/UI/calendar";
import { Button } from "@/components/UI/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";
import { Checkbox } from "@/components/UI/checkbox";

const FormSchema = z.object({
  deliveryDate: z.date({
    required_error: "Delivery Pickup Date is Required",
  }),
  deliveryTime: z.string({
    required_error: "Please select an time to display.",
  }),
  candleAndKnife: z.boolean().default(false).optional(),
  greetingCard: z.boolean().default(false).optional(),
});

export default function OrderForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col w-72">
              <FormLabel>Delivery/Pickup Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button name="date-btn" variant={"outline"} className={cn("w-72 pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
            <FormItem className="flex flex-col w-72">
              <FormLabel>Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified time to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10AM - 1PM">10AM - 1PM</SelectItem>
                  <SelectItem value="1PM - 3PM">1PM - 3PM</SelectItem>
                  <SelectItem value="3PM - 5PM">3PM - 5PM</SelectItem>
                  <SelectItem value="5PM - 7PM">5PM - 7PM</SelectItem>
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
            <FormItem className="flex w-72 flex-row items-start space-x-2 space-y-0 rounded-md border px-4 py-3">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
            <FormItem className="flex w-72 flex-row items-start space-x-2 space-y-0 rounded-md border px-4 py-3">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Add Greeting Card</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button name="order-submit" type="submit" className="bg-luoDarkBiege hover:bg-luoDarkBiege hover:opacity-75">
          Submit
        </Button>
      </form>
    </Form>
  );
}
