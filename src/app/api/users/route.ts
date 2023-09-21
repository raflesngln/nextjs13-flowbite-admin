import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';

// export async function GET(req:any) {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users', {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.DATA_API_KEY}`,
//     },
//   });

//   if (!res.ok) {
//     // Return a generic error response
//     return NextResponse.error();
//   }

//   const data = await res.json();

//   return NextResponse.json({ data });
// }

// export async function GET(req: any) {
//     // console.log(req.url.pathname)
//     console.log(req.url.search)
//     try {
//        let page='';
//        let perpage='';
//     //   const { page, perpage } = req.query;

//       // Rest of your code

//       return NextResponse.json({ message: 'Data received successfully', page, perpage });
//     } catch (error) {
//       console.error('Error processing GET data:', error);
//       return NextResponse.error({ message: 'Failed to process data' });
//     }
//   }

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const page = searchParams.get('page')
    const perpage = searchParams.get('perpage')
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DATA_API_KEY}`,
        },
    })
    const product = await res.json()

    return NextResponse.json({message:'okee',page:page,perpage:perpage,data:{ product }})
}



export async function POST(request:any) {
    try {
        const body = JSON.parse(await request.text());
        // You can access the request body in the 'body' variable
        console.log('Received POST data:', body);

        // Process the data or perform other operations as needed

        // Return a successful response
        return NextResponse.json({ message: 'Data received successfully',data:body });
    } catch (error) {
        // Handle any errors that occur during processing
        console.error('Error processing POST data:', error);

        // Return an error response
        return NextResponse.json({ message: 'Failed to process data' });
    }
}

export async function PUT(request:any) {
    try {
        const body = JSON.parse(await request.text());
        // You can access the request body in the 'body' variable
        console.log('Update POST data:', body);

        // Process the data or perform other operations as needed

        // Return a successful response
        return NextResponse.json({ message: 'Data received successfully for Update',data:body });
    } catch (error) {
        // Handle any errors that occur during processing
        console.error('Error processing PUT data:', error);

        // Return an error response
        return NextResponse.json({ message: 'Failed to process update data' });
    }
}


export async function HEAD(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}