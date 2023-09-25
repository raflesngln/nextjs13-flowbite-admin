/* eslint-disable @next/next/no-async-client-component */

/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { stringify } from "querystring";
import Link from "next/link";
import {
  Badge,
  Label,
  Select,
  Checkbox,
  Table,
  Button,
  Pagination, Modal
} from "flowbite-react";
import {
  HiCheck,
  HiAdjustments,
  HiCloudDownload,
  HiUserCircle,
  HiOutlinePlusSm,
  HiOutlineChartPie,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaBeer } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

// import { prisma } from "@/lib/prisma";

export default function PageUsers() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const [dataUser, setDataUser] = React.useState([]);
  const [message, setMessage] = React.useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [perpage, setPerpage] = useState(10);
  const [setup, setSetup] = useState({ total_data: 0, total_pages: 0 });

  const onPageChange = (page: number) => setCurrentPage(page);

  const getData = async (page: number) => {
    const resp = await fetch(
      `/api/users-prisma?page=${currentPage}&per_page=${perpage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const mydata = await resp.json();
    console.log(mydata);
    setDataUser(mydata.data);
    setSetup((prev) => ({
      ...prev,
      total_data: mydata.total_data,
      total_pages: mydata.total_pages,
    }));
  };

 
  const deleteData = async (id: any) => {
      try {
        const apiUrl = `/api/users-prisma/${id}`; // Replace with your API endpoint and ID
        const response = await fetch(apiUrl, {
          method: "DELETE",
        });

        toast.success("Data deleted!");
        if (!response.ok) {
          // Handle HTTP error status codes here
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        // Data successfully deleted
        setMessage({ status: "deleted id " + id });
      } catch (error) {
        // Handle errors that occur during the fetch
        console.error("Error:", error);
      }
    
  };

  const setPerPage = (event: any) => {
    setPerpage(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log("Fetching data for page:", currentPage);
    getData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perpage,message]);

  return (
    <main className="flex min-h-screen flex-col items-left py-4 px-2">
      <div className="flex flex-row justify-between p-5">
        <div>
          <h1>DATA USERS</h1>
          {/* <PopUpModal isOpen deleteDataProps={(e: any)=>deleteData(e)}/> */}
          {/* <p>{JSON.stringify(setup)}</p> */}
        </div>

        <div>
          <Button.Group outline>
            <Button className="px-0 py-0" color="gray" outline>
              <Link href={`/user_prisma/new-data`}>
                <HiOutlinePlusSm className="mr-1 h-4 w-4" />
                New Data
              </Link>
            </Button>
            <Button className="px-0 py-0" color="gray" outline>
              <Link href={`/user_prisma/new-data`}>
                <HiOutlineChartPie className="mr-1 h-4 w-4" />
                <p>Report</p>
              </Link>
            </Button>
          </Button.Group>
        </div>
      </div>
      <div className="flex flex-row justify-between p-5">
      <div className="max-w-md" id="select">
            <div className="mb-2 block">
              <Label htmlFor="showCount" value="Show Count" />
            </div>
            <Select className="py-0 px-0 m-0" id="showCount" required onChange={setPerPage}>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>50</option>
            </Select>
          </div>

        <Pagination
          currentPage={11}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          showIcons
          totalPages={setup.total_pages}
        />
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
                      <Button.Group>
                        <Button
                          className="btn btn-sm px-0 py-0"
                          color="success"
                        >
                          <Link href={`/user_prisma/edit-user/${val.id}`}>
                            <p>Edit</p>
                          </Link>
                        </Button>
                        {/* <Button
                          onClick={(e) => deleteData(val.id)}
                          className="btn btn-sm px-0 py-0"
                          color="failure"
                        >
                          <p>Delete</p>
                        </Button> */}
                        <PopUpModal idUser={val.id} nameUser={val.name} deleteDataProps={(e: any)=>deleteData(e)}/>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })}
        </Table.Body>
      </Table>
      <div className="flex flex-row justify-end p-5">
        {/* <p>PAGE : {currentPage}</p> */}
        <Pagination
          currentPage={11}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          showIcons
          totalPages={setup.total_pages}
        />
      </div>
    </main>
  );
}

function PopUpModal(paramParent:any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const deleteAction=()=>{
    paramParent.deleteDataProps(paramParent.idUser)
    props.setOpenModal(undefined)
  }
  return (
    <>
      <Button className="btn btn-sm px-0 py-0" color="failure" onClick={() => props.setOpenModal('pop-up')}>Delete </Button>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure to delete user  <span className="font-bold text-rose-500">{paramParent.nameUser} ?</span>
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteAction()}>
                Yes, Im sure
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
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
