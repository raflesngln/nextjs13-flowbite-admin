
import { use } from 'react';
import Link from 'next/link';
import { stringify } from 'querystring';


export async function generateStaticParams(){
    let params = {department_title:'', page:1,per_page:10,order_by:'id',order_direction:'asc'};
    let param=stringify(params);
    const resp=await fetch(`http://localhost:8080/api/v1/departement?${param}`,{
        next:{
            revalidate:10. // ISG
        }
    });
    const data=await resp.json();

    return data.data.map((val: { id: any; }) => ({
        id: val.id.toString(),
      }))
} 
const getDetail= async (id:any)=>{
    const res= await fetch(`http://localhost:8080/api/v1/departement/${id}`,{
        next:{
            revalidate:10. // ISG
        }
    })
    const data=await res.json();
    return data;
} 

export default async function Page({ params }:any) {
    const {data}= await getDetail(params.id)
    return(
        <>
        {/* <div>data {JSON.stringify(posts)}</div> */}
        <div>
            {
                data && 
                <div>
                    <li>{data.id}</li>
                    <li>{data.department_title}</li>
                    <li>{data.description}</li>
                </div>
            }
        </div>
        </>
    );
}