import api from '@/libs/api'

import Head from 'next/head'
import { useState } from 'react'

interface user {
  id: number
  name: string
  email: string
}

type Props = {
  users: user[]
}

export default function Home({ users }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function newUser() {
    const data = { name, email }
    await fetch('api/users', {
      headers: {
        'content-type': 'application/json',
      },

      body: JSON.stringify(data),
      method: 'POST',
    })
  }
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

        <div>
          <form
            className="flex flex-col max-w-md mt-16 gap-y-4 text-black"
            onSubmit={newUser}
          >
            <label className="text-zinc-50">Adicionar novo usuário</label>
            <input
              type="text"
              placeholder="nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
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
