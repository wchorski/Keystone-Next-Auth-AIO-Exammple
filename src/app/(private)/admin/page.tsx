import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { SchedualCalendar } from "@components/SchedualCalendar"
import fetchBookings from "@lib/fetchdata/fetchBookings"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { ResolvingMetadata } from "next"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

type Props = {
  params: { id: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
    date: string | undefined;
  };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
) {
	const session = await getServerSession(nextAuthOptions)
  

	return {
		title: (session?.data.role.name === "admin" ? 'Admin Tools' : '404') + " | " + envs.SITE_TITLE,
		description: envs.SITE_DESCRIPTION,
	}
}

const today = new Date();

const page = 1
const perPage = envs.PERPAGE
export default async function AdminPage({ params, searchParams }: Props) {
  const { date }  = await searchParams
	const session = await getServerSession(nextAuthOptions);

  // TODO list out `canManage*` permissions here and hide and show modules accordingly
  if(session?.data.role.name !== 'admin') return notFound()

  const dateParam = date || today.toDateString();
  const dateString = new Date(dateParam).toDateString();
  // const { events, count, error: eventsError } = await fetchEvents(dateString);
  // TODO when events are here
  const events:any[] = []
  const { bookings, error: bookingsError } = await fetchBookings(dateString, QUERY_BOOKINGS, session);
  if (bookingsError)
    return <ErrorMessage error={bookingsError} />;

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Admin Tools</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<h2>Events & Bookings </h2>
				<SchedualCalendar date={dateString} events={events} bookings={bookings} />
			</div>
		</main>
	)
}


const QUERY_BOOKINGS = `
  typeof
  id
  summary
  start
`;