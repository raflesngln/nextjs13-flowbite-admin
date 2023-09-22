This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

UI/UX design Component Library use flowbite tailwindcss
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:5566) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Step by Step Setup Prisma ORM In NextJS 13
DOCS:
https://codevoweb.com/how-to-setup-prisma-orm-in-nextjs-13-app-directory/

### **Instal Prisma**
```
yarn add @prisma/client
yarn add -D prisma
```

#### **Create provider**
```
yarn prisma init --datasource-provider mysql
```

#### **Edit file .env depends on your database configuration**
```
DATABASE_URL="mysql://attgroup:att123@localhost:3306/nextjs13_fullstack"
```


#### **Add model to scheme.prisma**

```
..........before code.......
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### **Create Migrate**
```
yarn prisma migrate dev --name init
```

#### **Seeed the Database**
```
yarn add -D ts-node
```
#### **create file seed**
-  prisma/seed.ts

```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Rafles",
      email: "Rafles@gmail.com",
      role: "admin",
      password: "08123843847", // Provide a password value
      phone: "623486346",   // Provide a phonets value
    },
  });

  console.log({ user });
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```


#### **Add Seed in package.json**
```
  {
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

#### **run command seed**
 ```
  yarn prisma db seed
 ```




## **Instantiate the Prisma Client**

>   #### **creaete file confog**
> 
> src/lib/prisma.ts
```
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
```


> #### **call prisma in Any Page**
```

import Image from "next/image";
import { stringify } from "querystring";
import { prisma } from "@/lib/prisma";

export default async function UserPage() {
  const dataUser = await getDataWithPrisma();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h3>Access DB with Prisma CLient </h3>
        <p>This Page Use Prisma To ACcess Database</p>
        <hr />
        <br />
        {dataUser.map((val, i): any => {
          return (
            <div key={i} style={{ marginBottom: "30px" }}>
              <p>{val.id}</p>
              <p>{val.name}</p>
              <p>{val.email}</p>
              <p>{val.role}</p>
              <p>{val.phone}</p>
              <hr />
            </div>
          );
        })}
      </div>
    </main>
  );
}

async function getDataWithPrisma() {
  let users = await prisma.user.findMany();
  return users;
}
```

## **CREATE REST API WITH PRISMA NEXTJS 13**

> #### **1. Create api handler**
>
>  src/app/api/users/route.ts

```
   import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}


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
```

> #### **2. create api Dynamic Route For access SINGLE USER,UPDATE and DELETE DATA**
>
>  src/app/api/users/[id]/route.ts

```
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

    return new NextResponse(`Data dengan ID User ('${id}') berhasil di Hapus`, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No user with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
```

> #### **3. Access Rest API with Postman For testing Rest API**



http://localhost:5566/api/users



