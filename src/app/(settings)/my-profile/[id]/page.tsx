
import { use } from 'react';
import Link from 'next/link';

export async function generateStaticParams(){
    const res= await fetch(`https://dummyjson.com/posts?limit=7`)
    const data=await res.json();

    return data.posts.map((val: { id: any; }) => ({
        id: val.id.toString(),
      }))
} 

const getDetail= async (id:any)=>{
    const res= await fetch(`https://dummyjson.com/posts/${id}`)
    const data=await res.json();
    return data;
} 

export default async function Page({ params }:any) {
    /* also can here for one function without set getDetail function*/
    // const res= await fetch(`https://dummyjson.com/posts/${params.id}}`) ;
    // const posts=await res.json();

    const posts= await getDetail(params.id)
  

    return(
        <>
        {/* <div>data {JSON.stringify(posts)}</div> */}
        <div>
            {
                posts && 
                <div>
                    <li>{posts.id}</li>
                    <li>{posts.title}</li>
                    <li>{posts.body}</li>
                    <li>{posts.userId}</li>
                    
                </div>
            }
        </div>
        </>
    );
}