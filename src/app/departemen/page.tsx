import { use } from 'react';
import Link from 'next/link';

import { stringify } from 'querystring';

 async function getDepartemen (){
    let params = {department_title:'', page:1,per_page:10,order_by:'id',order_direction:'asc'};
    let param=stringify(params);
  
    const resp=await fetch(`http://localhost:8080/api/v1/departement?${param}`,{
        next:{
            revalidate:10. // ISG
        }
    });
    return resp.json();
  
  }

type Post = { id: any; department_title: string; };

export default async function DepartemenLayout() {
    let { data } = await getDepartemen();

    return (
        <div>
            {/* <p>{JSON.stringify(data)}</p> */}
            <h1 className='text-2xl'>Departemen</h1>
            <p>This Page Use ISG( Incremental Static Regeneration)</p>
            <hr/>
            <br/>
            {data.map((value: any) => (
                <Link href={`/departemen/${value.id}`} key={value.id}>
                    <div>
                        <li>{value.id}-{value.department_title}</li>
                    </div>
                </Link>
            ))}
        </div>
    );
}

