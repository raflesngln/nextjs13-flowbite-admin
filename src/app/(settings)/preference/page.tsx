import { use } from 'react';
import Link from 'next/link';

const getPosts = async () => {
    let posts = await fetch('https://dummyjson.com/posts?limit=7',{
        next:{
            revalidate:10. // ISG
        }
    });
    return posts.json();
};

type Post = { id: any; title: string; };

export default function PostLayout() {
    let { posts } = use(getPosts());
    return (
        <div>
            <h1 className='text-2xl'>Preferencce page</h1>
            {posts.map((post: Post) => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                    <div>
                        <li>{post.id}-{post.title}</li>
                    </div>
                </Link>
            ))}
            <div>
        </div>
        </div>
    );
}