import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:py-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="relative p-[1px] w-fit overflow-hidden rounded-full bg-rose-500 group transition-all duration-300 ease-in-out hover:bg-rose-600">
        <Badge
          variant="secondary"
          className="relative flex items-center px-6 py-2 text-base font-medium bg-white rounded-full transition-all duration-300 group-hover:bg-rose-50"
        >
          <Sparkles className="h-8 w-8 lg:h-10 lg:w-10 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
            Powered by AI
          </p>
        </Badge>
      </div>
      <h1 className="font-bold py-6 text-center tracking-tight">
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-muted-foreground">
        Effortlessly summarize your documents with our advanced AI tools.
      </h2>
      <Button
        variant={"link"}
        className="text-background mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-slate-800 hover:to-rose-600 transition-all duration-300"
      >
        <Link href={"/#pricing"} className=" flex gap-2 items-center">
          <span className="">Try Synapse</span>
          <ArrowRight className="animate-pulse" />
        </Link>
      </Button>
    </section>
  );
}
