import connectDatabase from "@/src/db/databaseConnection";
import UserModel from "@/src/models/usersSchema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { name, userName, email, password, image } = await req.json()
        await connectDatabase();

        const isUserPresent = await UserModel.findOne({ email })

        if (isUserPresent) {
            return NextResponse.json({ message: 'User Is Already Present !!', result: false },
                { status: 200 })
        }

        const hashPassword = hash(password, 10)

        const newUser = new UserModel({
            name,
            userName,
            email,
            image,
            password: hashPassword

        })

        const response = await newUser.save();

        return NextResponse.json({ message: "user Created successfully !!", user: response, success: true }
            , { status: 200 })

    } catch (error: Error) {
        return NextResponse.json({ message: "Failed To Create User!!", success: true, error: error.message }
            , { status: 500 })
    }

}