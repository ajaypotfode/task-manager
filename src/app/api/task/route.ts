import connectDatabase from "@/src/db/databaseConnection";
import { getLoggedInUser } from "@/src/utils/jwtVerification";
import TaskModel, { TaskType } from "@/src/schema/taskSchema";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import CategoryModel from "@/src/schema/categorySchema";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { title, description, date, category, priority, time } = await req.json();
        const user = await getLoggedInUser();
        const dateObj = date ? new Date(date) : new Date();

        await connectDatabase();

        const newTask = new TaskModel({
            title,
            time,
            description,
            userId: user?.userId,
            date: format(dateObj, 'yyyy-MM-dd'),
            day: format(dateObj, 'EEE'),
            category,
            priority
        })

        await CategoryModel.findOneAndUpdate({ _id: category }, {
            $inc: { taskCount: 1 }
        })

        await newTask.save()
        const result = await newTask.populate('categories', 'name taskCount color')

        return NextResponse.json({ message: "task Created successFully", success: true, task: result },
            { status: 200 }
        )


    } catch (error) {
        console.log("error :", error);

        return NextResponse.json({ message: "Failed To Create Task", success: false, error: error },
            { status: 500 }
        )

    }
}


export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const category = req.nextUrl.searchParams.get('category')

    try {
        const user = await getLoggedInUser();

        await connectDatabase();
        let task: TaskType[] = []

        if (category === 'all') {
            task = await TaskModel.find({ userId: user?.userId })
                .populate('categories', 'name taskCount color')
        } else {
            task = await TaskModel.find({ userId: user?.userId, category: category })
                .populate('categories', 'name taskCount color')
        }

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
        }).populate('categories', 'name taskCount color');


        if (!task) {
            return NextResponse.json(
                { success: false, message: 'Task not found' },
                { status: 404 }
            );
        }

        if (task.category?._id) {
            await CategoryModel.findByIdAndUpdate(task.category._id, {
                $inc: { taskCount: -1 },
            });
        }
        return NextResponse.json({ message: "task Deleted successFully", success: true, tasks: task },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Delete Task", success: false, error: error },
            { status: 500 }
        )

    }
}


