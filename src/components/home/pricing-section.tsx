import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";

type PriceType = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};
const plans = [
  {
    id: "basic",
    name: "Basic",
    paymentLink: "",
    priceId: "",
    price: 9,
    description: "For casual readers",
    items: [
      "5 PDF summaries per month",
      "Standard Processing Speed",
      "Email support",
    ],
  },
  {
    id: "pro",
    paymentLink: "",
    priceId: "",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority Processing",
      "24/7 priority support",
      "Markdown export",
    ],
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
  priceId,
}: PriceType) => {
  return (
    <div
      className="relative w-full max-w-lg hover:scale-105
        transition-all duration-300 ease-in-out
        "
    >
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl ",
          id === "pro" ? "border-rose-500 gap-5 border-2" : ""
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <p className="text-lg lg:text-xl capitalize font-bold">{name}</p>
          <p className="text-base-content/80 mt-2">{description}</p>
        </div>
        <div className="flex  gap-2">
          <p className="text-5xl tracking-tight   font-extrabold">{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs text-gray-500">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className=" space-y-2 flex justify-center w-full ">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 text-white border-2 py-2 transition-all",
              id === "pro"
                ? "bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-rose-500"
                : "bg-gradient-to-r from-rose-500 to-rose-300 hover:from-rose-400 hover:to-rose-600 border-rose-400"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section id="pricing">
      <div
        className="
      py-12
      lg-py-24
      max-w-5xl
        mx-auto
        px-4
        sm-px-6
        lg-px-8
        text-center
        lg:pt-12
      "
      >
        <div className="flex flex-col items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl  text-rose-500 mb-2">
            Pricing
          </h2>
          <p
            className=" 
            text-3xl
            lg-text-3xl
            font-bold
            max-w-2xl
            mx-auto
            text-center
            lg:mb-12
            text-gray-900
         
        
          "
          >
            Choose a plan that works for you
          </p>
        </div>
        <div className="flex relative flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}