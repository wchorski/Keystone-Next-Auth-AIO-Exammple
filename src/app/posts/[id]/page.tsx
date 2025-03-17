import { nextAuthOptions } from "@/session"
// import {
//   layout_site,
//   page_content,
//   page_layout,
//   } from '@styles/layout.module.css'
import { getServerSession } from "next-auth"
import { fetchPostById } from "../../fetch/fetchPostById"
import { notFound } from "next/navigation"
import { DocumentRender } from "../../DocumentRender"
import Image from "next/image"
import { gql } from "../../graphql"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function PostByIdPage({ params, searchParams }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { post, error } = await fetchPostById({
		id,
		session,
		query: gql`
      title
      featured_image
      content {
        document
      }
      author {
        id
        name
      }
    `,
	})

	if (error) return <p>data fetch error. {error.toString()} </p>
	if (!post) return notFound()

	const { title, featured_image, content, author } = post

	return (
		<main
		// className={[page_layout].join(' ')}
		>
			<header
			// className={layout_site}
			>
				<figure className={"featured_img"}>
					<Image
						src={featured_image}
						alt="post featured image"
						fill={true}
						priority={true}
					/>
				</figure>
				<h1>{title}</h1>
				{author && <p className="card">Author: {author.name}</p>}
        <hr />
			</header>
			<div
			// className={[page_content, layout_site].join(' ')}
			>
				<DocumentRender document={content.document} />
			</div>
		</main>
	)
}
