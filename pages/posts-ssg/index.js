import Link from 'next/link'

function PostsSsr({data}) {
    if (!data) return <span>Loading...</span>
    return (<div>
        <ul>
            {data.map(({id, title, body}) => {
                return (
                    <div key={id} style={{textAlign: 'center'}}>
                        <h3>{title}</h3>
                        <p>{body}</p>
                        <Link href={`/posts-ssr/${id}`}>
                            <a style={{color: 'blue'}}>More details</a>
                        </Link>
                        <hr/>
                    </div>
                )
            })}
        </ul>
    </div>)
}


export async function getStaticProps() {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts`)
    const data = await res.json()

    return {props: {data}}
}

export default PostsSsr;