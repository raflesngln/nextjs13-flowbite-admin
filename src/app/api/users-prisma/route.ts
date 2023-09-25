import { NextResponse } from "next/server";
import { IncomingMessage } from "http";

import { prisma } from "@/lib/prisma";

// GET Data Request
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  // const pageSize = parseInt(query.get('per_page')) || 10;
  const per_page: any = query.get("per_page") || 10;
  const page: any = query.get("page") || 1;

  try {
    // Fetch the total count of records
    const totalCount = await prisma.user.count();

    // Calculate the total pages
    const totalPages = Math.ceil(totalCount / parseInt(per_page));

    const users = await prisma.user.findMany({
      take: parseInt(per_page), // Limit the number of records per page
      skip: (parseInt(page) - 1) * parseInt(per_page), // Offset based on the page number
    });

    return NextResponse.json({
      page: parseInt(page),
      per_page: parseInt(per_page),
      total_data: totalCount,
      total_pages: totalPages,
      data: users,
    });

    // return NextResponse.json({total_page:10,page:parseInt(page),per_page:parseInt(per_page),data:users});
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("", { status: 500 }); // Create an error response with status code 500
  }
}


// Post Data
export async function POST(request: Request) {
  try {
    const json = await request.json();

    const user = await prisma.user.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
