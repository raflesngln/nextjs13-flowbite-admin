import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IUser {
  id: number;
  name: string;
  email: string;
  // Other user properties...
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10), // Ensure 'id' is a number
      },
    });

    if (!user) {
      return new NextResponse("No user with ID found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = params.id;
    let json = await request.json();

    const updatedUser: IUser = await prisma.user.update({
      where: { id: parseInt(id, 10) }, // Ensure 'id' is a number
      data: json,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = params.id;
    await prisma.user.delete({
      where: { id: parseInt(id, 10) }, // Ensure 'id' is a number
    });

    return new NextResponse(`Data dengan ID User ('${id}') berhasil di Hapus`, {
      status: 200,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No user with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
