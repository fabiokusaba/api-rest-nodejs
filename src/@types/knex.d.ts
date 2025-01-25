// Arquivo de definição de tipos para o knex
// eslint-disable-next-line
import { Knex } from 'knex'

// Adicionando novos tipos
declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
