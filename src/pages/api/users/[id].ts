import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface dataType {
  name?: string
  email?: string
}

const handlerGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id as string),
    },
  })

  if (!user) {
    return res.status(200).json({ message: 'User não encontrado' })
  }
  return res.status(200).send(user)
}

async function handlerPut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const { name, email } = req.body

  const data: dataType = {}

  if (name) {
    data.name = name
  }
  if (email) {
    data.email = email
  }

  const userExists = await prisma.user.findFirst({
    where: { id: parseInt(id as string) },
  })

  if (!userExists) {
    return res.json({ message: 'user não encontrado' })
  }

  const userUpdated = await prisma.user.update({
    where: { id: parseInt(id as string) },
    data,
  })

  if (userUpdated) {
    return res
      .status(200)
      .json({ message: 'Usuário alterado', newUser: userUpdated })
  }
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handlerGet(req, res)
      break
    case 'PUT':
      handlerPut(req, res)
      break
  }
}

export default handler
