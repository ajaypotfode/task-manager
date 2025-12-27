import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'


const SECRETE_KEY = process.env.JWT_SECRETE || ""

export const getLoggedInUser = async () => {
    const cookie = await cookies();
    const token = cookie.get('taskToken')?.value;

    if (!token) return null;

    const user = jwt.verify(token, SECRETE_KEY) as { userId: string }

    return { userId: user.userId }
}
