import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/libs/prisma'

// GET all users
async function handlerGET(req: NextApiRequest, res: NextApiResponse) {
  const getUsers = await prisma.user.findMany({})
  console.log(getUsers)

  return res.status(200).send(getUsers)
}

// POST all users
async function handlerPOST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  })

  return res.status(201).send(newUser)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    handlerGET(req, res)
  } else if (req.method === 'POST') {
    handlerPOST(req, res)
  }
}

export default handler
