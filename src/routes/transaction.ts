import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// Cookies -> formas da gente manter contexto entre requisições

// Plugins no fastify -> obrigatoriamente todo plugin precisa ser uma função assíncrona porque é a lógica que
// o fastify usa para poder carregar todo o plugin
export async function transactionsRoutes(app: FastifyInstance) {
  // Criando um handler global
  app.addHook('preHandler', async (request) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  // Aqui no fastify eu consigo receber a minha requisição/request e dentro dela temos o body
  app.post('/', async (request, reply) => {
    // Definindo o schema de validação dos dados
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // Validando os dados da requisição com o schema que definimos
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // Estou procurando dentro dos cookies da minha requisição se já existe uma sessionId
    let sessionId = request.cookies.sessionId

    // Porém, se esse usuário não tem nos cookies dele um id de sessão ainda eu vou criar um novo
    if (!sessionId) {
      sessionId = crypto.randomUUID()

      // Definindo um cookie para o usuário
      reply.cookie('sessionId', sessionId, {
        path: '/', // Quais rotas vão poder acessar esse cookie
        maxAge: 60 * 60 * 24 * 7, // Expiração do cookie em segundos -> 7 dias
      })
    }

    // Criando uma nova transação
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    // HTTP Codes -> códigos que simbolizam o tipo de retorno que estou tendo da minha API
    // 201 - Created: recurso criado com sucesso
    return reply.status(201)
  })

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      // Vamos utilizar um método que podemos chamar em qualquer banco sql que é o método de agregação sum
      // em que ele vai basicamente somar todos os valores de uma coluna, como segundo parâmetro no sum posso
      // passar algumas configurações e uma delas é o as que quer dizer o nome que eu quero dar para o resultado
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )
}
