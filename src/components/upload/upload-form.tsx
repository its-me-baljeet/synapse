"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";

const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "Please upload a valid PDF file",
    })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size should be less than 20MB"
    )
    .refine((file) => file.type === "application/pdf", "File should be a PDF"),
});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validating
    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      console.error(validatedFields.error.message);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 ">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}