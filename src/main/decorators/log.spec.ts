import { vitest, describe, expect, test } from "vitest"
import { LogControllerDecorator } from "./log"
import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols"

interface SutTypes {
  sut: LogControllerDecorator,
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 201,
        body: {
          name: 'Junior',
          email: 'junior@mail.com',
          password: '1234',
          passwordConfirmation: '1234'    
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }   
  return new ControllerStub()
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub }  = makeSut()
    const handleSpy = vitest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_passowrd',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut }  = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_passowrd',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 201,
      body: {
        name: 'Junior',
        email: 'junior@mail.com',
        password: '1234',
        passwordConfirmation: '1234'    
      }
    })
  })
})
