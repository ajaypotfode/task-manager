import mongoose, { Model,Document, Schema, Types } from "mongoose";

export interface TaskType extends Document {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    title: string,
    description: string,
    date: string,
    time: string,
    category: Types.ObjectId,
    isComplete: boolean,
    priority: string
}

const taskSchema = new Schema<TaskType>({
    title: {
        type: String,
        required: [true, 'title Is Required'],
    },
    description: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date: {
        type: String,
        required: [true, "date Is required"],
    },
    time: {
        type: String,
        required: [true, "Time Is required"],
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [true, 'category is required'],
        ref: 'categories'
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false,
    },
    priority: {
        type: String,
        required: [true, 'priority is required'],
        default: 'high'
    }

})

const TaskModel = mongoose.models.tasks as Model<TaskType> ||
    mongoose.model('tasks', taskSchema);

export default TaskModel;