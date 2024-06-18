import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../UI/accordion";

export default function FaqProductDetail() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-6xl text-luoDarkBiege px-4 md:px-0">
      <div className="flex flex-col gap-4">
        <span className="text-xl font-semibold tracking-wide">FAQ</span>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-50" />
      </div>

      <AccordionItem value="item-1">
        <AccordionTrigger>Why can’t I select a specific date?</AccordionTrigger>
        <AccordionContent>
          Dates that appear greyed out are no longer available because they have surpassed the cutoff time.<br /> For instance, cakes requiring a 1-day preorder by 2pm must be ordered at least one day prior, before the 2pm cutoff, to ensure we
          have sufficient time to prepare your cake to perfection.
        </AccordionContent>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-50" />
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can you write a personalized message on the cake?</AccordionTrigger>
        <AccordionContent>We do not offer message writing on cakes. However, we provide a personalized message card service. Please enter your message in the designated box above when placing your order.</AccordionContent>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-50" />
      </AccordionItem>
    </Accordion>
  );
}
