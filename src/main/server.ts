import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

console.log('PRECISO TIRAR ESTE LOG: ')
console.log(env.mongoUrl)
console.log('-'.repeat(100))

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => { console.log(`Server running at http://localhost: ${env.port}`) })
  })
  .catch(console.error)
