import fastify from 'fastify'
import type { UserModel } from './UserModel'
import getSuperusers from './functions/getSuperusers'
import { checkUserType } from './functions/checkUserType'

const server = fastify()

let users: unknown | UserModel[] = undefined

// Post users
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


// Get super users ( score >= 900 e active = true )
server.get('/superusers', async(request, reply) => {
  const start = Date.now()

  if(checkUserType(users)) {
    const superusers = getSuperusers(users)

    reply.code(200)
    reply.send({
      time: `${Date.now() - start} ms`,
      superusers
    })
  }

  reply.code(400)
  return 'Bad request'
})

// Get all users
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
