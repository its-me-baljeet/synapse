import BgGradient from "@/components/common/bg-gradient";
import EmptySummaryState from "@/components/summaries/empty-summary";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userId = user.id;

  const summaries = await getSummaries(userId);
  console.log("Summaries:", summaries);
  const uploadLimit = 5;
  return (
    <section>
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4 py-10">
        <div className="flex justify-between mb-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold bg-linear-to-r from-gray-700 to to-gray-900 text-transparent bg-clip-text">
              Your Summaries
            </h2>
            <p>Your uploaded PDF summaries.</p>
          </div>
          <div>
            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 hover:no-underline"
            >
              <Link
                href={"/upload"}
                className="flex items-center text-background"
              >
                <Plus className="h-5 w-5 mr-2" /> New Summary
              </Link>
            </Button>
          </div>
        </div>
        {summaries.length >= uploadLimit && (
          <div className="bg-rose-50 p-5 text-rose-800 border border-rose-200 rounded-lg text-sm">
            <p>You have reached your Limit of {uploadLimit} summary uploads.</p>
            <Link
              href={"/#pricing"}
              className="font-semibold underline underline-offset-8 inline-flex items-center"
            >
              Upgrade your plan to Pro!{" "}
              <ArrowRight className="inline-block h-4 w-4 ml-1" /> {""}
            </Link>
            for unlimited uploads
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            summaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
