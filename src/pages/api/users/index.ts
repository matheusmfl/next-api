import { NextApiRequest, NextApiResponse } from 'next'

import api from '@/libs/api'

// GET all users
async function handlerGET(req: NextApiRequest, res: NextApiResponse) {
  const users = await api.getAllUsers()
  return res.status(200).json(users)
}

// POST all users
async function handlerPOST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body

  const newUser = await api.addUser(name, email)

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
