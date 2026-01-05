import UserModel from '@/src/schema/usersSchema';
import { compare } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRETE_KEY = process.env.JWT_SECRETE || ""

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { password, email } = await req.json();

        const user = await UserModel.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "Invalid Email!!", success: false }, { status: 401 })
        }

        const isPasswordCorrect = await compare(password, user.password)

        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Invalid Password!!", success: false }, { status: 401 })
        }

        const token = jwt.sign({ userName: user.userName, userId: user._id }, SECRETE_KEY, { expiresIn: '1m' })

        const response = NextResponse.json({ message: 'user Loggesd In SuccessFully !!', success: true, result: user })
        response.cookies.set('taskToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        })

        return response

    } catch (error) {
        return NextResponse.json({ message: "Failed To log in User", success: false, error: error }, { status: 500 })

    }
}