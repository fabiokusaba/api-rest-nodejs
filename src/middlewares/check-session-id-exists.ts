import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  // Se a sessionId não existir dentro dos cookies eu posso retornar uma resposta de erro
  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
