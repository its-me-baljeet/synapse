"use server";

import { generateSummaryFromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import db from "@/services/prisma";
import { PDFSummaryType, StorePDFSummaryType } from "@/types";
// import { getDbConnected } from "@/lib/db";
import { formatFileNameTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { success } from "zod";
import { id } from "zod/v4/locales";

// Function to generate a deterministic UUID v5 from a string
function generateUUIDFromString(input: string): string {
  // Use a fixed namespace UUID (this is an example namespace)
  const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

  // Generate a UUID v5 from the input string
  const uuid = crypto
    .createHash("sha1")
    .update(NAMESPACE)
    .update(input)
    .digest("hex");

  // Format as UUID
  return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(
    12,
    16
  )}-${uuid.slice(16, 20)}-${uuid.slice(20, 32)}`;
}

export async function generatePdfSummary(uploadResponse: any) {
  console.log("Raw Upload Response:", uploadResponse);

  let fileUrl;
  let fileName;

  // Case 1: If `uploadResponse` is a **string**, use it directly
  if (typeof uploadResponse === "string") {
    fileUrl = uploadResponse;
    // Extract filename from URL string
    fileName = fileUrl.split("/").pop() || "unknown-file";
  }
  // Case 2: If `uploadResponse` is an **array**, extract `ufsUrl`
  else if (Array.isArray(uploadResponse) && uploadResponse.length > 0) {
    fileUrl = uploadResponse[0]?.ufsUrl || uploadResponse[0]?.appUrl;
    fileName =
      uploadResponse[0]?.fileName || uploadResponse[0]?.name || "unknown-file";
  }
  // Case 3: If `uploadResponse` is an **object**, extract `ufsUrl`
  else if (typeof uploadResponse === "object" && uploadResponse !== null) {
    fileUrl = uploadResponse?.ufsUrl || uploadResponse?.appUrl;
    fileName =
      uploadResponse?.fileName || uploadResponse?.name || "unknown-file";
  }

  // Handle invalid file URL cases
  if (!fileUrl || typeof fileUrl !== "string") {
    console.error("Invalid file URL format:", fileUrl);
    return {
      success: false,
      message: "Invalid file URL format",
      data: null,
    };
  }

  try {
    // Extract text from the PDF
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    // console.log("Extracted PDF Text:", pdfText);

    let summary;

    try {
      console.log("Processing PDF text for summary generation...");
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("OpenAI Summary:", summary);
    } catch (error) {
      console.error("OpenAI Error:", error);

      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Gemini Summary:", summary);
        } catch (geminiError) {
          console.error("Gemini API call failed:", geminiError);
          throw geminiError;
        }
      } else {
        throw error;
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary from both OpenAI and Gemini",
        data: null,
      };
    }

    const formattedFileName = formatFileNameTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary, title: formattedFileName, fileName },
    };
  } catch (error) {
    console.error("Error generating PDF summary:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error generating summary",
      data: null,
    };
  }
}

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

// async function savedPdfSummary({
//   userId,
//   fileUrl,
//   summary,
//   title,
//   fileName,
// }: PdfSummaryType) {
//   try {
//     const sql = await getDbConnected();

//     // Generate a UUID from the Clerk user ID
//     const userUUID = userId ? generateUUIDFromString(userId) : null;

//     // Make sure the UUID is valid
//     if (
//       !userUUID ||
//       !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
//         userUUID
//       )
//     ) {
//       throw new Error("Cannot generate valid UUID from user ID");
//     }

//     console.log("Generated UUID:", userUUID);

//     const result = await sql`
//       INSERT INTO pdf_summaries (
//         user_id,
//         original_file_url,
//         summary_text,
//         title,
//         file_name
//       ) VALUES (
//         ${userUUID}::uuid,
//         ${fileUrl},
//         ${summary},
//         ${title},
//         ${fileName}
//       ) RETURNING id;
//     `;

//     return result && result.length > 0 ? result[0] : null;
//   } catch (error) {
//     console.error("Error saving PDF summary:", error);
//     throw error;
//   }
// }

// export async function storePdfSummaryAction({
//   fileUrl,
//   summary,
//   title,
//   fileName,
// }: Omit<PdfSummaryType, "userId">) {
//   try {
//     const { userId } = await auth();
//     console.log(userId, "User ID");

//     if (!userId) {
//       return {
//         success: false,
//         message: "User not authenticated",
//       };
//     }

//     const savedSummary = await savedPdfSummary({
//       userId,
//       fileUrl,
//       summary,
//       title,
//       fileName,
//     });

//     if (!savedSummary) {
//       return {
//         success: false,
//         message: "Failed to save PDF summary",
//       };
//     }

//     revalidatePath(`/summaries/${savedSummary.id}`);

//     return {
//       success: true,
//       message: "PDF summary saved successfully",
//       data: {
//         id: savedSummary.id,
//       },
//     };
//   } catch (error) {
//     console.error("Error in storePdfSummaryAction:", error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Error storing summary",
//     };
//   }
// }

async function savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    }: PDFSummaryType) {
  try {
    const res = await db.pDFSummary.create({
      data: {
        user_id: userId,
        original_file_url: fileUrl,
        summary_text: summary,
        status: "COMPLETED",
        title,
        file_name: fileName,
      },
    });
    return res;
  } catch (error) {
    console.error("Error in savedPdfSummary:", error);
    throw error;
    };
}

export async function storePdfSummaryAction({
      fileUrl,
      summary,
      title,
      fileName,
    }: StorePDFSummaryType) {
  //user logged in
  //save PDF summary
  let savedSummary;
  try {
    const {userId} = await auth();
    if(!userId){
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if(!savedSummary){
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
  } catch (error) {
    console.error("Error in storePdfSummaryAction:", error);
    return{
      success: false,
      message: error instanceof Error ? error.message : "Error storing summary",
    }
  }

  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}