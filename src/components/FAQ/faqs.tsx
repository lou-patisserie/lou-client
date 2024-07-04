import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../UI/accordion";

type Props = {
  maxWidth?: string;
};

export default function FAQs({ maxWidth = "max-w-5xl" }: Props) {
  return (
    <Accordion type="single" collapsible className={`w-full ${maxWidth} text-luoDarkBiege px-4 md:px-0 flex flex-col gap-5 `}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1 items-center">
          {/* <ChevronLast strokeWidth={2.5} size={25} /> */}
          <span className="text-lg md:text-2xl font-bold tracking-wide">FAQs</span>
        </div>

        <div className="h-[1px] w-full bg-luoDarkBiege opacity-25" />
      </div>

      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm md:text-md font-semibold">Ordering</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">How to Order?</p>
            <ul className=" ml-6 list-disc [&>li]:mt-2">
              <li>Option 1: Come directly to our store.</li>
              <li>Option 2: Chat to our Whatsapp (+6281110019906).</li>
              <li>Option 3: Direct message to our Instagram (@lou.jkt).</li>
              <li>Option 4: Via Grab/Gojek.</li>
              <li>Option 5: Via Tokopedia.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">What are your bestsellers?</p>
            <span>Refer to our 'Monthly Bestsellers' on the homepage or use our 'Cake Selection Guide' for recommendations. or can be asked directly to us.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Can I order for today?</p>
            <span>Absolutely. For whole cakes, given a minimum pre-order time of 1 hour.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Can I walk in and purchase directly from Lachér Patisserie?</p>
            <span>Absolutely!</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Can I customize the Petit Gateau sets?</p>
            <span>Absolutely!</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Do you write messages on the cake?</p>
            <p>Absolutely. You can ask for a message to be written in white chocolate or on the cake board for whole cake orders while for petit gateau, the minimum purchase is 4 petit gateau.</p>
          </div>
        </AccordionContent>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-25" />
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-sm md:text-md font-semibold">Payments, Refunds and Invoices</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">What forms of payment do you accept?</p>
            <span>We only accept cashless payment.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Are orders refundable?</p>
            <span>All orders are non-refundable.</span>
          </div>
        </AccordionContent>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-25" />
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-sm md:text-md font-semibold">Halal, Product Information & Customization</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Are your products halal?</p>
            <span>Our products are no pork no lard.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">How should I store the desserts/cakes and for how long?</p>
            <span>For petit gateau, best consumed within 48 hours or can stay at room temperature for 1-2 hours.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Will the cake last during a car ride?</p>
            <span>Cakes can withstand a car journey for up to 1-2 hours with high AC. For longer trips, consider an insulator bag with ice packs.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Can I adjust the sweetness or customize my cake?</p>
            <span>Our recipes are standardized, and we produce each product in batches. Therefore, changes to sweetness or customizations are not available, except for whole cakes.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Are your cakes suitable for specific diets or allergies?</p>
            <span>
              All our products contain eggs, dairy, gluten, and sugar, making them unsuitable for diabetics, vegans, or those on a keto diet. We also handle nuts and gluten in our kitchen, which may pose a risk to individuals with
              allergies. For detailed dietary and allergen information, please refer to the ingredients list.
            </span>
          </div>
        </AccordionContent>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-25" />
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-sm md:text-md font-semibold">Other</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Does Lou have a loyalty program?</p>
            <span>Absolutely!</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Does Lou have a cooking class?</p>
            <span>There are no cooking classes at the moment, but there will always be various workshops in Lou every month.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Does Lou have wifi?</p>
            <span>Absolutely!</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Is Lou pet friendly?</p>
            <span>Our outdoor areas are pet friendly, but if you want to bring your pet indoors, you must use a stroller or trolley and wear diapers.</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Can I rent the 2nd floor?</p>
            <span>Absolutely! You can hold a private event on the 2nd floor. For more information, please contact us via whatsapp.</span>
          </div>
        </AccordionContent>
        <div className="h-[1px] w-full bg-luoDarkBiege opacity-25" />
      </AccordionItem>
    </Accordion>
  );
}
