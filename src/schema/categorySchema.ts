import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface CategoryType extends Document {
    _id: Types.ObjectId
    name: string,
    userId: Types.ObjectId,
    taskCount: number,
    color: string;
}

const categorySchema = new Schema<CategoryType>({
    name: {
        type: String,
        required: true,
        unique: true,
        default: 'General'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    taskCount: {
        type: Number,
        required: true,
        default: 0
    },
    color: {
        type: String,
        required: true
    }
}, { timestamps: true });

const CategoryModel = mongoose.models.categories as Model<CategoryType>
    || mongoose.model<CategoryType>('categories', categorySchema);

export default CategoryModel;