/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { stringify } from "querystring";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
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
            <Link href={`user_prisma/${val.id}`} key={i} >
            <div style={{ marginBottom: "30px" }}>
            <img
              src={`https://robohash.org/${val.id}?set=set2&size=120x120`}
              alt={val.name}
              style={{ height: 180, width: 180 }}
            />
              <p>{val.id}</p>
              <p>{val.name}</p>
              <p>{val.email}</p>
              <p>{val.role}</p>
              <p>{val.phone}</p>
              <hr />
            </div>
            </Link>
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
