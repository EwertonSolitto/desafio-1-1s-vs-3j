import fastify from 'fastify'
import type { UserModel } from './UserModel'

const server = fastify()

let users: unknown | UserModel[]

server.post('/users', async (request, reply) => {
  if(request !== null) {
    users = request.body

    console.log('Data loaded!')

    reply.code(200)
    return 'Data loaded!'
  }
  reply.code(400)
  return 'Bad Request'
})

server.get('/', async (request, reply) => {
  reply.code(200)
  return users
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

