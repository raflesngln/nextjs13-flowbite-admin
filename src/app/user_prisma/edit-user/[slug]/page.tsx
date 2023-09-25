"use client";

import { User } from "@prisma/client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { HiPencil } from "react-icons/hi";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateDataPage({params}:any) {
  const router = useRouter();
  const idUser = params.slug;

  const [data, setData] = React.useState({});
  const [message, setMessage] = React.useState<any>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    phone: "",
  });

  const getData = async () => {
    const resp = await fetch(`/api/users-prisma/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const mydata = await resp.json();
    console.log(mydata);
    setData(mydata);
    setFormData(mydata);
  };


  const updateDataUser = async (event: any) => {
    event.preventDefault();
    toast.loading("Waiting...");

    try {
      const apiUrl = `/api/users-prisma/${idUser}`; // Replace with your API URL
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // You can add other headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle HTTP error status codes here
        toast.error(`This is an error! ${response.status}`);
        setTimeout(()=>{toast.dismiss();},3000)
        // throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // Process responseData as needed
      console.log(responseData)
      toast.success("Successfully Update!");
      setMessage("success Update data");
      setTimeout(()=>{toast.dismiss();},3000)
      setTimeout(()=>{
        router.push("/user_prisma");
      },1000)
    } catch (error) {
      // Handle errors that occur during the fetch or processing of the response
      toast.error(`This is an error! ${error}`);
      setTimeout(()=>{toast.dismiss();},3000)
      
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("ambil data");
    getData();
  }, [message]);

  return (
    <React.StrictMode>
      <div className="flex justify-center w-full p-2">
        <div className="flex flex-col w-80">
          <div className="flex mb-10">
            <HiPencil className="mr-1 h-5 w-5" />
            <h1>EDIT DATA USER</h1>
          </div>
          <form onSubmit={updateDataUser} className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                sizing="sm"
                type="text"
                required
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="email" />
              </div>
              <TextInput
                sizing="sm"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="role" />
              </div>
              <TextInput
                sizing="sm"
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="password" />
              </div>
              <TextInput
                sizing="sm"
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="phone" />
              </div>
              <TextInput
                sizing="sm"
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between mt-10 gap-2">
              <Button type="submit" className="w-80" color="success">
                Update Data
              </Button>
              <Link href={`/user_prisma`}>
                <Button type="button" className="w-30" color="failure">
                  Cancel
                </Button>
              </Link>
            </div>

            <Toaster />
          </form>
        </div>
      </div>
    </React.StrictMode>
  );
}
