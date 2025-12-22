import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface CategoryType extends Document {
    name: string,
    userId: Types.ObjectId,
}

const categorySchema = new Schema<CategoryType>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

const CategoryModel = mongoose.models.categories as Model<CategoryType>
    || mongoose.model<CategoryType>('categories', categorySchema);

export default CategoryModel;