import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DATA_API_KEY}`,
        },
    });

    if (!res.ok) {
        // Return a generic error response
        return NextResponse.error();
    }

    const data = await res.json();

    return NextResponse.json({ data });
}



export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}