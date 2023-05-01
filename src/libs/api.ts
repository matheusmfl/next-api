import { prisma } from './prisma'

const api = {
  getAllUsers: async () => {
    const getUsers = await prisma.user.findMany({
      select: { name: true, email: true, id: true },
    })
    console.log(getUsers)

    return getUsers
  },
  addUser: async (name: string, email: string) => {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return newUser
  },
}

export default api
