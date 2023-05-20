import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
     <h1>{JSON.stringify(session)}</h1>
     <h1>hahha</h1>
    </div>
  )
}
