import Checkout from "@/components/Checkout/checkout";
import SubHeroBanner from "@/components/UI/SubHero-Banner/subhero-banner";

export default function CheckOutPage() {
  return (
    <>
      <SubHeroBanner height="h-60" />
      <div className="flex flex-wrap my-10 md:my-16 mx-auto justify-center">
        <Checkout />
      </div>
    </>
  );
}
