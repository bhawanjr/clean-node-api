import env from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usecases/survey/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptografy/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
