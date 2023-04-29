import { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '@/utils/users'

async function handlerGET(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ Users })
}

async function handlerPOST(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ created: true })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    handlerGET(req, res)
  } else if (req.method === 'POST') {
    handlerPOST(req, res)
  }
}

export default handler
