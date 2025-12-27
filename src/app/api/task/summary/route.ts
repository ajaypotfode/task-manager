import { weekObj } from "@/src/helpers/api/weekData";
import { getLoggedInUser } from "@/src/utils/jwtVerification"
import TaskModel from "@/src/models/taskSchema";
import { format } from "date-fns";
// import ReactPlayer from "react-player";


const GET = async () => {
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


        const completedPercent = taskCount > 0 ? (completedTask / taskCount) * 100 : 0;

        const weeklyReport = await TaskModel.find({
            date: { $gte: format(pastWeek, 'yyyy-MM-dd'), $lte: format(currentDate, 'yyyy-MM-dd') },
        })

        weeklyReport.forEach(task => {
            if (task.isComplete) {
                const day = task.day
                weekObj[day] += 1
            }
        })

        const chartData = Object.entries(weekObj).map(([day, count]) => ({
            day=

        }))


    } catch (error) {

    }
}