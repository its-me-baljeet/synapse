import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="max-w-7xl pb-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
            bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 
            sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full">
            <Pizza className="w-8 h-8 text-rose-500" />
          </div>

          <h3 className="font-bold text-3xl md:text-4xl max-w-2xl mx-auto">
            Watch how Summarise transforms your PDFs into an{" "}
            <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent italic">easy to read summary!</span>
          </h3>

          <p className="text-gray-600 max-w-xl mx-auto text-lg tracking-wider">
            Our AI-powered tool extracts the key information and presents it in
            a clean, digestible format so you can grasp the content quickly.
          </p>

          <div className="mt-8 p-2 bg-gray-100 rounded-lg shadow-sm border border-gray-200 w-full max-w-3xl">
            <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500 font-medium">Crousel Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}