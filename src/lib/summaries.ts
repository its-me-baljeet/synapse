import db from "@/services/prisma";

export async function getSummaries(userId: string) {
    const summaries = await db.pDFSummary.findMany({
        where:{
            user_id: userId
        },
    })

    return summaries || [];
}