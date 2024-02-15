import { Express } from 'express'
import { bodyParser } from '../config/middlewares/body-parse'

export default (app: Express): void => {
  app.use(bodyParser)
}
