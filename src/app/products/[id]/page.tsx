
import { use } from 'react';
import Link from 'next/link';

export const revalidate = 50 

const getDetail= async (id:any)=>{
    const res= await fetch(`https://dummyjson.com/products/${id}`,{
        cache:'no-store'
    })
    return res.json();
} 

export default async function Page({ params }:any) {
    let id = params.id;
    const data=await getDetail(id)
    return(
        <>
        <div>Post of id: {id}</div>
        <div>
            {
                data && 
                <div>
                    <li>{data.id}</li>
                    <li>{data.title}</li>
                    <li>{data.thumbnail}</li>
                    <li>{data.price}</li>
                    <li>{data.rating}</li>
                    <li>{data.stock}</li>
                    <li>{data.description}</li>
                    <h2>IMAGES</h2>
                    {
                        data?.images.map((val:any,i:any)=>{
                            return(
                                <li key={i}>{val}</li>
                            )
                        })
                    }
                </div>
            }
        </div>
        </>
    );
}