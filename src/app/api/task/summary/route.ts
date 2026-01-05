import { weekObj } from "@/src/helpers/api/weekData";
import { getLoggedInUser } from "@/src/utils/jwtVerification"
import TaskModel from "@/src/schema/taskSchema";
import { format } from "date-fns";
import { NextResponse } from 'next/server'
// import ReactPlayer from "react-player";


export const GET = async () => {
    try {
        const user = await getLoggedInUser();
        const currentDate = new Date();
        const pastWeek = new Date();
        pastWeek.setDate(currentDate.getDate() - 7);

        // const formatDate = (date: Date) => date.toISOString().split('T')[0];
        const taskCount = await TaskModel.countDocuments({
            userId: user?.userId,
            date: { $gte: format(pastWeek, 'yyyy-MM-dd'), $lte: format(currentDate, 'yyyy-MM-dd') }
        });

        const completedTask = await TaskModel.countDocuments({
            userId: user?.userId,
            isComplete: true,
            date: { $gte: format(pastWeek, 'yyyy-MM-dd'), $lte: format(currentDate, 'yyyy-MM-dd') }
        });

        const pendingTask = taskCount - completedTask;

        const completedPercent = taskCount > 0 ? (completedTask / taskCount) * 100 : 0;

        const pendingPercent = taskCount > 0 ? (pendingTask / taskCount) * 100 : 0;

        const weeklyReport = await TaskModel.find({
            date: { $gte: format(pastWeek, 'yyyy-MM-dd'), $lte: format(currentDate, 'yyyy-MM-dd') },
        });

        weeklyReport.forEach(task => {
            if (task.isComplete) {
                const day = task.day
                weekObj[day]['complete'] += 1
            } else {
                const day = task.day
                weekObj[day]['pending'] += 1
            }
        });

        const chartData = Object.entries(weekObj).map(([day, { complete, pending }]) => ({
            day,
            complete,
            pending

        }));

        const result = {
            taskCount,
            completedTask,
            pendingTask,
            completedPercent,
            pendingPercent,
            chartData
        };

        return NextResponse.json({ message: 'Summary Fetched Successfully!!', success: true, summary: result },
            { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Failed To Fetch Summary', success: false, error },
            { status: 500 }
        );

    }
}