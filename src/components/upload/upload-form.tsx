"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a valid PDF file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size should be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File should be a PDF",
    }),
});

export default function UploadForm() {
  let toastId: string | number | undefined;

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadBegin: (files) => {
      // start the loading toast when upload begins
      toastId = toast.loading(`Uploading file...`);
      console.log("Upload has begun for", files);
    },
    onClientUploadComplete: () => {
      // replace the loading toast with success
      toast.success("✅ File uploaded successfully!", { id: toastId });
      console.log("Uploaded successfully!");
    },
    onUploadError: (err) => {
      // replace the loading toast with error
      toast.error("❌ Error occurred while uploading.", { id: toastId });
      console.error("Error occurred while uploading", err);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      console.error(validatedFields.error.message);
      toast.error(validatedFields.error.issues[0]?.message || "Invalid file");
      return;
    }

    // trigger upload — toasts will be handled in callbacks
    await startUpload([file]);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}