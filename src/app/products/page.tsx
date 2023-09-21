import { use } from 'react';
import Link from 'next/link';

export const revalidate = 50 

const getProducts= async () => {
    let products = await fetch('https://dummyjson.com/products?limit=7',{
        cache:"no-store"
    });
    return products.json();
};

type Prod = { id: any; title: string; };

export default function ProductLayout() {
    let { products } = use(getProducts());
    return (
        <div>
            <h1 className='text-2xl'>Product page</h1>
            <p>This Page Use SSR( Server Side Rendering)</p>
            <hr/>
            <br/>
            {products.map((val: Prod) => (
                <Link href={`/products/${val.id}`} key={val.id}>
                    <div>
                        <li>{val.id}-{val.title}</li>
                    </div>
                </Link>
            ))}

        </div>
    );
}