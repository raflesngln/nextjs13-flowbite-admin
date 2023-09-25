/* eslint-disable @next/next/no-async-client-component */

/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { stringify } from "querystring";
import Link from "next/link";
import { Badge, Checkbox, Table, Button, Pagination } from "flowbite-react";
import {
  HiCheck,
  HiAdjustments,
  HiCloudDownload,
  HiUserCircle,
} from "react-icons/hi";

// import { prisma } from "@/lib/prisma";

export default function Home() {
  const [dataUser, setDataUser] = React.useState([]);
  const [message, setMessage] = React.useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  const getData = async () => {
    const resp = await fetch(`/api/users-prisma`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const mydata = await resp.json();
    console.log(mydata);
    setDataUser(mydata);
  };

  const deleteData = (id:any) => {
    alert("deleter data "+ id);
  };

  useEffect(() => {
    console.log("ambil data");
    getData();
  }, [message]);

  return (
    <main className="flex min-h-screen flex-col items-left py-4 px-2">
      {/* <Link href={`/user_prisma/edit-user`}>
        <button style={{ background: "red", padding: "8px" }}>New Data</button>
      </Link> */}

     
      <div className="flex-1 ">
        <h1>Data Users</h1>
        <h1>Data Users</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>ACtion</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {dataUser &&
            dataUser.map((val: any, i: number) => {
              return (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {val.name}
                    </Table.Cell>
                    <Table.Cell>{val.email}</Table.Cell>
                    <Table.Cell>{val.role}</Table.Cell>
                    <Table.Cell>{val.phone}</Table.Cell>
                    <Table.Cell>
                      {val.verified ? "Verified" : "Non-Verified"}
                    </Table.Cell>
                    <Table.Cell>
                      
                        {/* <Link href={`/user_prisma/edit-user`}>
        <button style={{ background: "red", padding: "8px" }}>New Data</button>
      </Link>  */}
                        <Button.Group outline>
                        <Link href={`/user_prisma/edit-user/${val.id}`}>
                          <Button className="btn btn-sm"  color="gray">
                              <p>Edit</p>
                            </Button>
                        </Link>
                          
                          <Button onClick={(e)=>deleteData(val.id)} className="btn btn-sm" color="gray">
                            <p>Delete</p>
                          </Button>
                         
                        </Button.Group>

                        {/* <Badge icon={HiCheck}>Delete</Badge> */}
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })}

        </Table.Body>
       
      </Table>
      <div className="flex">
        <p>Data User</p>
      <Pagination
      currentPage={11}
      onPageChange={page=>{setCurrentPage(page)}}
      showIcons
      totalPages={100}
    />
      </div>

    </main>
  );
}

// async function getDataWithPrisma() {
//   let users = await prisma.user.findMany();
//   return users;
// }

// async function getDataWithPrismaGetApi() {
//   let users = await fetch('http://localhost:5566/api/users-prisma',{
//     method:'get',
//     headers:{
//       'Content-Type':'application/json'
//     }
//   });

//   let resp=await users.json();
//   return resp;
// }

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
