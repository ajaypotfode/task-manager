import connectDatabase from "@/src/db/databaseConnection";
import TaskModel from "@/src/schema/taskSchema";
import { getLoggedInUser } from "@/src/utils/jwtVerification";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const user = await getLoggedInUser();
        const todaysDate = format(new Date(), 'yyyy-MM-dd');

        await connectDatabase();

        let tasks = await TaskModel.find({ userId: user?.userId, date: todaysDate })
            .populate('categories', 'name taskCount color');

        if (!tasks.length) {
            tasks = await TaskModel.find({ userId: user?.userId })
                .populate('categories', 'name taskCount color')
                .sort({ createdAt: -1 })
                .limit(5);
        }


        return NextResponse.json({ message: "task Fetched successFully", success: true, tasks: tasks },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Fetch Task", success: false, error: error },
            { status: 500 }
        )

    }
}