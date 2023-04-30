## Fazendo filtro com prisma ORM 


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


Usarei o exemplo acima

Para fazer um filtro mais avançado dentro do Where, 
posso fazer o seguinte: 
const user = await prisma.user.findMany({
    where: {
      name: {startsWith: 'Matheus'} 
## Usando o startsWith, eu consigo filtrar pessoas que começam com: expressão ou 
## posso usar o endsWith para filtrar algo que termina com a expressão que passarmos.
## Ainda dentro desse assunto, também existe o Equals, que faz como se não tivesse isso
    },

## Na linha abaixo, o select faz o retorno da informação conforme os filtros que passamos;
    select: {
      name: true,
      id: true,
    },
  })

## OR [] - Dentro do Where, podemos colocar um 'ou' para fazer alguma condicional.
ex: 
Where: {
  name: {
    OR: [
      {name: 'Matheus'},
      {name: {
        startsWith: 'Ma'
      }}
    ]
  }
}

## AND: []    -- Serve como um operador && 