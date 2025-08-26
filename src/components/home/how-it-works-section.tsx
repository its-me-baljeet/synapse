import { BrainCircuitIcon, DownloadIcon, FileText } from "lucide-react";

type Step = {
  label: string;
  description: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF document or click to upload.",
    icon: <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500" />,
  },
  {
    label: "Summarize your PDF",
    description:
      "Our AI-powered algorithm will analyze your PDF and generate a summary.",
    icon: (
      <BrainCircuitIcon className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500" />
    ),
  },
  {
    label: "Download your summary",
    description: "Download your summary in PDF format or share it with others.",
    icon: <DownloadIcon className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500" />,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-6 sm:py-12 lg:py-24">
      {/* Gradient Line */}
      <div className="relative bottom-10   flex justify-center">
        <div className="h-1 hidden sm:block bg-gradient-to-r from-rose-500 to-cyan-500 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]"></div>
      </div>

      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
            bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 
            sm:left-[calc(40%-30rem)] sm:w-[40.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-lg sm:text-xl font-bold uppercase mb-2 text-rose-500">
          How It Works
        </h2>
        <h3 className="font-bold text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto">
          Transform any PDF into an easy-to-digest summary in three simple
          steps.
        </h3>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.label}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg transition duration-300 border-2 border-gray-50 hover:border-rose-500"
            >
              <div className="flex items-center justify-center p-3 bg-gradient-to-br from-rose-100 to bg-transparent rounded-full">
                {step.icon}
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-gray-800">
                {step.label}
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}