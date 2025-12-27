import connectDatabase from "@/src/db/databaseConnection";
import { getLoggedInUser } from "@/src/utils/jwtVerification";
import TaskModel from "@/src/models/taskSchema";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { title, description, date, category, priority } = await req.json();
        const user = await getLoggedInUser()
        const dateObj = new Date(date)

        await connectDatabase();

        const newTask = new TaskModel({
            title,
            time: format(dateObj, 'HH:mm'),
            description,
            userId: user?.userId,
            date,
            day: format(dateObj, 'EEE'),
            category,
            priority
        })

        await newTask.save()

        return NextResponse.json({ message: "task Created successFully", success: true, task: newTask },
            { status: 200 }
        )


    } catch (error) {
        console.log("error :", error);

        return NextResponse.json({ message: "Failed To Create Task", success: false, error: error },
            { status: 500 }
        )

    }
}

export const GET = async (): Promise<NextResponse> => {
    try {
        const user = await getLoggedInUser();

        await connectDatabase();

        const task = await TaskModel.find({ userId: user?.userId })
            .populate('categories', 'name')

        return NextResponse.json({ message: "task Fetched successFully", success: true, task: task },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Fetch Task", success: false, error: error },
            { status: 500 }
        )

    }
}


export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const id = req.nextUrl.searchParams.get('id')
        const user = await getLoggedInUser();
        await connectDatabase();

        const task = await TaskModel.findOneAndDelete({
            userId: user?.userId,
            _id: id
        });

        return NextResponse.json({ message: "task Deleted successFully", success: true, task: task },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Delete Task", success: false, error: error },
            { status: 500 }
        )

    }
}


