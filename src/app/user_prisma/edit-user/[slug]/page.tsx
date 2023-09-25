"use client";

import { User } from "@prisma/client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function TodoComponent() {
  const router = useRouter();
  const[data,setData]=React.useState()
  const[message,setMessage]=React.useState<any>()


  const getData = async () => {
      const resp= await fetch(`/api/users-prisma`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const mydata=await resp.json()
      console.log(mydata)
      setData(mydata)

    }

    const saveNewData = async () => {
      var newData={
        "name": "Mira",
        "email": "Mira@admin.com",
        "role": "admin",
        "password": "121324131",
        "phone": "98645968"
      }

      try {
        const apiUrl = '/api/users-prisma'; // Replace with your API URL
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // You can add other headers if needed
          },
          body: JSON.stringify(newData),
        });
  
        if (!response.ok) {
          // Handle HTTP error status codes here
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        // Process responseData as needed
        setMessage(responseData);
      } catch (error) {
        // Handle errors that occur during the fetch or processing of the response
        console.error('Error:', error);
      }
    };


    const updateData = async (id:number|string) => {
      var newData={
        "name": "Mira SAJA",
        "email": "Mira@admin.com",
        "role": "admin",
        "password": "888888",
        "phone": "999999"
      }

      try {
        const apiUrl = `/api/users-prisma/${id}`; // Replace with your API URL
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // You can add other headers if needed
          },
          body: JSON.stringify(newData),
        });
  
        if (!response.ok) {
          // Handle HTTP error status codes here
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        // Process responseData as needed
        setMessage(responseData);
      } catch (error) {
        // Handle errors that occur during the fetch or processing of the response
        console.error('Error:', error);
      }
    };

    
    const deleteData = async (id:number|string) => {
      try {
        const apiUrl = `/api/users-prisma/${id}`; // Replace with your API endpoint and ID
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          // Handle HTTP error status codes here
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        // Data successfully deleted
        setMessage({status:'deleted id '+ id});
      } catch (error) {
        // Handle errors that occur during the fetch
        console.error('Error:', error);
      }
    };


useEffect(()=>{
  console.log('ambil data')
  getData()

},[message])

  return (
    <React.StrictMode>

    <h2>Get Data Routse API with client </h2>
    <p>{JSON.stringify(data)}</p>

    <Button onClick={()=>saveNewData()}>
      Create New Data
    </Button>
    <Button onClick={()=>updateData('10')}>
      Update Data id 10
    </Button>
    <Button onClick={()=>deleteData('7')}>
      DELETE ID 7
    </Button>

    <p>Message: {JSON.stringify(message)}</p>
    </React.StrictMode>
  );
  
}

