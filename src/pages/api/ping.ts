import { NextApiRequest, NextApiResponse } from 'next'

const test = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ pong: true })
}

export default test
