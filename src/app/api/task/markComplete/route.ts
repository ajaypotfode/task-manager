import connectDatabase from "@/src/db/databaseConnection";
import { getLoggedInUser } from "@/src/utils/jwtVerification";
import TaskModel from "@/src/schema/taskSchema";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const id = req.nextUrl.searchParams.get('id')
        const user = await getLoggedInUser();
        await connectDatabase();

        const task = await TaskModel.findOneAndUpdate({
            userId: user?.userId,
            _id: id
        },
            { isComplete: true }
        ).populate('categories', 'name taskCount color');


        if (!task) {
            return NextResponse.json(
                { success: false, message: 'Task not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "task marked As Complete", success: true, task: task },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed to task marked As Complete", success: false, error: error },
            { status: 500 }
        )

    }
}