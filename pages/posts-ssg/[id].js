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

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { id: post.id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.id}`)
    const data = await res.json()

    // Pass post data to the page via props
    return { props: { data } }
}


export default PostsSsrDetails;