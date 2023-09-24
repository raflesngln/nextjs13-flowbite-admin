/* eslint-disable @next/next/no-async-client-component */

/* eslint-disable @next/next/no-img-element */
// "use client"
import Image from "next/image";
import { stringify } from "querystring";
import Link from "next/link";
// import { Button } from 'flowbite-react';

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const dataUser = await getDataWithPrisma();
  const data_api:any = await getDataWithPrismaGetApi();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href={`/user_prisma/edit-user`}>
        <button style={{background:'red',padding:'8px'}}>
          New Data
        </button>
        </Link>

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

        <p> GET ROute API: {JSON.stringify(data_api)}</p>
      </div>
    </main>
  );
}

async function getDataWithPrisma() {
  let users = await prisma.user.findMany();
  return users;
}

async function getDataWithPrismaGetApi() {
  let users = await fetch('http://localhost:5566/api/users-prisma',{
    method:'get',
    headers:{
      'Content-Type':'application/json'
    }
  });

  let resp=await users.json();
  return resp;
}

// async function getDataWithPrismaAPiPost() {
//   let users = await fetch('/api/users-prisma',{
//     method:'POST',
//     headers:{
//       'Content-type':'application/json'
//     },
//     body:JSON.stringify({
//       email:'raflesngln@gmail.com',username:'raflesngln',password:'1224324324'
//     })
//   })