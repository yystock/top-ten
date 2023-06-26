import Thread from "./Thread";
import getPostById from "@/app/actions/getPostById";

import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/lib/session";
interface IParams {
  postId?: string;
}
export default async function PostDetails({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const data = await getPostById(params);

  if (data) return <Thread post={data} currentUser={currentUser} />;
  else return <EmptyState />;
}
