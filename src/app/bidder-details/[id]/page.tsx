import { redirect } from "next/navigation";

// Redirect all /bidder-details/[id] visits to the new /user-details/[id] URL
export default async function BidderDetailsRedirectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    redirect(`/user-details/${id}`);
}
