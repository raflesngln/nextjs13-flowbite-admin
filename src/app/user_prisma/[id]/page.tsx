/* eslint-disable @next/next/no-img-element */
import { use } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const getDetail = async (id: any) => {
  // const res= await fetch(`https://dummyjson.com/posts/${id}`)
  // const data=await res.json();
  // return data;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10), // Ensure 'id' is a number
    },
  });
  return user;
};

export default async function Page({ params }: any) {
  /* also can here for one function without set getDetail function*/
  // const res= await fetch(`https://dummyjson.com/posts/${params.id}}`) ;
  // const posts=await res.json();

  const dataUser = await getDetail(params.id);

  return (
    <>
      {/* <div>data {JSON.stringify(dataUser)}</div> */}
      <div>
        {dataUser && (
          <div>
            <img
              src={`https://robohash.org/${dataUser.id}?set=set2&size=180x180`}
              alt={dataUser.name}
              style={{ height: 180, width: 180 }}
            />
            <li>{dataUser.id}</li>
            <li>{dataUser.name}</li>
            <li>{dataUser.email}</li>
            <li>{dataUser.role}</li>
          </div>
        )}
      </div>
    </>
  );
}
