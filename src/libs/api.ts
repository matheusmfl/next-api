import { prisma } from './prisma'

const api = {
  getAllUsers: async () => {
    const getUsers = await prisma.user.findMany({
      select: { name: true, email: true, id: true },
    })
    console.log(getUsers)

    return getUsers
  },
}

export default api
