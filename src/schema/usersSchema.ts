import mongoose, { Schema, Document, Types, Model } from 'mongoose'

export interface UsersType extends Document {
    _id: Types.ObjectId,
    name: string,
    userName: string,
    password: string,
    email: string,
    image: string
}


const userSchema = new Schema<UsersType>({
    name: {
        type: String,
        required: [true, 'Name Field Is required']
    },
    userName: {
        type: String,
        required: [true, 'userName Is Required'],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password Is required"]

    },
    image: {
        type: String,
        default:'/image'
    }
}, { timestamps: true })


const UserModel = mongoose.models.users as Model<UsersType>
    || mongoose.model<UsersType>('users', userSchema);

export default UserModel