import { use } from "react";
import Link from "next/link";
import ReactQueryHydrate from "@/app/components/hydrate-client";
import getQueryClient from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import SomeComponent from "@/app/components/someComponent";

export const revalidate = 50;

async function getUser() {
  const res = await fetch("/user");
  const users = await res.json();
  return users;
}

const getProducts = async () => {
  let products = await fetch("https://dummyjson.com/products?limit=7", {
    cache: "no-store",
  });
  return products.json();
};

type Prod = { id: any; title: string };

export default async function ProductLayout() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user"], getUser);
  const dehydratedState = dehydrate(queryClient);

  let { products } = await getProducts();
  return (
    <div>
      <h1 className="text-2xl">Product page</h1>
      <p>This Page Use SSR( Server Side Rendering)</p>
      <hr />
      <br />
      {products.map((val: Prod) => (
        <Link href={`/products/${val.id}`} key={val.id}>
          <div>
            <li>
              {val.id}-{val.title}
            </li>
          </div>
        </Link>
      ))}
      <ReactQueryHydrate state={dehydratedState}>
        <div>
          <SomeComponent />
        </div>
      </ReactQueryHydrate>
    </div>
  );
}
