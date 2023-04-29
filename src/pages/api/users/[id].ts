import { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '@/utils/users'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: { id?: string | string[] } = req.query

  // eslint-disable-next-line prefer-const
  let myUser = null

  // eslint-disable-next-line prefer-const
  for (let i in Users) {
    if (Users[i].id.toString() === id) {
      myUser = Users[i]
    }
  }
  if (myUser) {
    res.json(myUser)
  } else {
    res.json({ error: 'Usuário não encontrado!' })
  }
}

export default handler
