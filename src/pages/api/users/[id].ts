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
    select: {
      name: true,
      id: true,
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

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  // eslint-disable-next-line no-unused-vars
  await prisma.user
    .delete({
      where: { id: parseInt(id as string) },
    })
    .catch(() => {
      res.json({ message: 'User não encontrado' })
    })

  return res.status(200).json({ message: 'user deletado' })
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handlerGet(req, res)
      break
    case 'PUT':
      handlerPut(req, res)
      break

    case 'DELETE':
      handlerDelete(req, res)
  }
}

export default handler
