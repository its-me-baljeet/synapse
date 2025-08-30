"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { formatFileNameTitle } from "@/utils/format-utils";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || formatFileNameTitle(fileUrl)}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          {createdAt ? formatDistanceToNow(new Date (createdAt), {addSuffix: true }) : "No Date"}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status || "Pending"}
    </span>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, rotate: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative"
    >
      <Card className="relative h-full p-3 sm:p-4 transition-all duration-300">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>

        <Link
          href={`/summaries/${summary.id}`}
          className="block p-3 sm:p-5 pb-2 sm:pb-3"
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.file_name}
              createdAt={summary.created_at}
            />

            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 pl-1 sm:pl-2">
              {summary.summary_text || "No summary available."}
            </p>

            <div className="flex justify-between items-center mt-1 sm:mt-2">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}