"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { deleteSummary } from "@/actions/summary-actions";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition(); // Track async state

  const handleDelete = () => {
    // startTransition(async () => {
    //   const result = await deleteSummary({ summaryId });

    //   if (result?.success) {
    //     toast.success("Summary deleted successfully!");
    //     setIsOpen(false);
    //   } else {
    //     toast.error("Failed to delete summary. Try again.");
    //   }
    // });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
          disabled={isPending} // Disable button while deleting
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            summary and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}