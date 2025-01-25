// Importando fastify
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionsRoutes } from './routes/transaction'

// Criando uma instância de fastify que vai ser a base da nossa aplicação
const app = fastify()

// Cadastro dos cookies na aplicação
app.register(cookie)

// Registrando um plugin -> uma coisa importante é que a ordem que definimos os plugins é a ordem que o fastify vai executar
// Na hora que importamos o plugin consigo passar uma segunda informação/parâmetro onde posso passar algumas configurações e
// uma delas é o prefixo da url que esse plugin seja ativo
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

// GET, POST, PUT, PATCH, DELETE
// Rotas da aplicação
app.get('/hello', async () => {
  return 'Hello World'
})

// Inicializando o servidor, ou seja, fazendo com que a nossa aplicação escute uma porta
// Como esse listen retorna uma promise nós usamos o then para que quando essa promise termine de ser executada eu consiga
// dar um console.log
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
