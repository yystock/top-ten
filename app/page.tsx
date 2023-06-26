import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const session = await getCurrentUser();
  console.log("Home Session:");

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      <h1>hahha</h1>
    </div>
  );
}
