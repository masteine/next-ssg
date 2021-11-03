import Link from 'next/link'

function PostsSsrDetails({data}) {
    if (!data) return <span>Loading...</span>
    const {id, title, body} = data;
    return (
        <div style={{textAlign: 'center', padding: '3rem'}}>
            <Link href="/posts-ssr"><a>
                <button>Go back</button>
            </a></Link>
            <div key={id}>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        </div>
    )
}


export async function getServerSideProps({params}) {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.id}`)
    const data = await res.json()

    return {props: {data}}
}

export default PostsSsrDetails;