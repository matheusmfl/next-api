import api from '@/libs/api'

import Head from 'next/head'

interface user {
  id: number
  name: string
  email: string
}

type Props = {
  users: user[]
}

export default function Home({ users }: Props) {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <main>
        <ul>
          {users.map((user) => {
            return <li key={user.id}>{user.name}</li>
          })}
        </ul>
      </main>
    </>
  )
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const users = await api.getAllUsers()
  return {
    props: {
      users,
    },
  }
}
