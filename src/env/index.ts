// Importando dotenv/config para ler o nosso arquivo .env que temos disponíveis e que contém as nossas variáveis de ambiente
import 'dotenv/config'

// Importando o z de dentro do zod que serve para criarmos um schema, ou seja, um formato de dados
import { z } from 'zod'

// Criando o schema das nossas variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), // development, test, production
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

// Quando chamo o método parse o que estamos fazendo é pegar o schema que criamos passar os dados que estão vindo de process.env
// e o zod vai automaticamente validar eles para nós, caso alguma informação dê erro o método parse vai disparar um error
// O safeParse ele é como se fosse o parse, também faz a validação, só que ele não dispara um erro caso a validação falhe
const _env = envSchema.safeParse(process.env)

// Fazendo a verificação se a nossa variável _env deu erro
if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())
  throw new Error('Invalid environment variables!')
}

// Se tudo ocorreu bem vamos exportar as variáveis para que possamos utilizá-las na aplicação
export const env = _env.data
