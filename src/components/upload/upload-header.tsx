import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";

export default function UploadHeader() {
  return (
    <section className="relative w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="relative z-10 flex items-center space-x-2">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-rose-500 group transition-all duration-300 ease-in-out hover:bg-rose-600">
          <Badge
            variant={"secondary"}
            className="relative flex items-center px-6 py-2 text-base font-medium bg-white rounded-full transition-all duration-300 group-hover:bg-rose-50"
          >
            <Sparkle className="h-12 w-12 lg:h-12 lg:w-10 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
              AI-Powered Content Creation
            </p>
          </Badge>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="font-bold text-5xl py-6 text-center">
          Start Uploading
          <span className="relative inline-block">
            <span className="relative z-10 px-1">Your PDF's</span>
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2  transform -skew-y-1 opacity-60"
              aria-hidden="true"
            ></span>
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Upload your PDF and let our AI do the magic! ✨
        </p>
      </div>
      {/* <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl">
    <p>Upload PDF</p>
  </div> */}
    </section>
  );
}