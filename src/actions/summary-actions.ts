"use server";

import db from "@/services/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(summaryId: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  try {
    const res = await db.pDFSummary.deleteMany({
      where: {
        id: summaryId,
        user_id: user.id,
      },
    });

    if (res.count === 0) {
      throw new Error("Summary not found or not owned by user");
    }

    revalidatePath(`/dashboard`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
