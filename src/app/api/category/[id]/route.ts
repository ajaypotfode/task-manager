import connectDatabase from "@/src/db/databaseConnection";
import { getLoggedInUser } from "@/src/utils/jwtVerification";
import CategoryModel from "@/src/schema/categorySchema";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> => {
    try {
        const user = await getLoggedInUser();
        const { id } = await params

        await connectDatabase();

        const category = await CategoryModel.findOne({ userId: user?.userId, _id: id })

        return NextResponse.json({ message: "Category Fetched successFully", success: true, result: category },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Fetch Category", success: false, error: error },
            { status: 500 }
        )

    }
}