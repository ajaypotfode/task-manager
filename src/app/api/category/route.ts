import connectDatabase from "@/src/db/databaseConnection";
import { getLoggedInUser } from "@/src/utils/jwtVerification";
import CategoryModel from "@/src/models/categorySchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { name } = await req.json();
        const user = await getLoggedInUser()

        await connectDatabase();

        const newCategory = new CategoryModel({
            name,
            userId: user?.userId
        })

        await newCategory.save()

        return NextResponse.json({ message: "Category Created successFully", success: true, category: newCategory },
            { status: 200 }
        )


    } catch (error) {
        console.log("error :", error);

        return NextResponse.json({ message: "Failed To Create Category", success: false, error: error },
            { status: 500 }
        )

    }
}


export const GET = async (): Promise<NextResponse> => {
    try {
        const user = await getLoggedInUser();

        await connectDatabase();

        const categories = await CategoryModel.find({ userId: user?.userId })

        return NextResponse.json({ message: "Categories Fetched successFully", success: true, categories: categories },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Fetch Categories", success: false, error: error },
            { status: 500 }
        )

    }
}


export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const id = req.nextUrl.searchParams.get('id')
        const user = await getLoggedInUser();
        await connectDatabase();

        const category = await CategoryModel.findOneAndDelete({
            userId: user?.userId,
            _id: id
        });

        return NextResponse.json({ message: "Category Deleted successFully", success: true, category: category },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Delete Category", success: false, error: error },
            { status: 500 }
        )

    }
}



export const UPDATE = async (req: NextResponse): Promise<NextResponse> => {
    try {
        const user = await getLoggedInUser();
        const { name, id } = await req.json()

        await connectDatabase();

        const category = await CategoryModel.findOneAndUpdate({
            userId: user?.userId, _id: id
        },
            { name: name }
        )

        return NextResponse.json({ message: "Category Updated successFully", success: true, category: category },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ message: "Failed To Update Category", success: false, error: error },
            { status: 500 }
        )

    }
}
