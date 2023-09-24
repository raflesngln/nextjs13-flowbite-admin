"use client";
import { stringify } from 'querystring';
import { useQuery } from "@tanstack/react-query";

async function getUser() {
//   const res = await fetch("https://reqres.in/api/users?page=2");
let params = {department_title:'', page:1,per_page:10,order_by:'id',order_direction:'asc'};
let param=stringify(params);

// {{base_url}}/api/v1/departement?department_title=&page=1&per_page=10&order_by=id&order_direction=asc

const res= await fetch(`http://localhost:8080/api/v1/departement?${param}`);
  // const res = await fetch("https://reqres.in/api/users/2");
  const users = (await res.json());
  return users;
}

export default function SomeComponent() {

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if(isLoading) return 'Loading Data......!'

  return (
    <>
    {/* <h1 className="font-bold">data users: {data?.data.first_name}</h1>
    <h1 className="font-bold">data users: {data?.data.email}</h1> */}
    {/* <h1 className="font-bold">data users: {JSON.stringify(data)}</h1> */}
    {/* <p>{JSON.stringify(data.data)}</p> */}
    <br/>
    <h1>CReate WIth Reat-query Hydration</h1>
    {
      data?.data.map((item:any,i:number)=>{
        return(
          <>
          <li>{item.department_title}</li>
          </>
        )
      })
    }
    </>
  );
}
