import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols"
import { Request, Response } from 'express'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    console.log(httpResponse.statusCode)
    console.log(httpResponse.body)

    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      console.log('O ERRO FOI ESTE: ')
      console.log('')
      console.log('')
      console.log(httpResponse.body)
      console.log('')
      console.log('')
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.messsage
      })
    }
  }
}
