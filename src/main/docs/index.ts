import { loginPath, signUpPath, surveyPath, surveyResultPath } from './paths'
import { badRequest, forbidden, notFound, serverError, unauthorized } from './components'
import { apiKeyAuthSchema, accountSchema, errorSchema, loginParamsSchema, signUpParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  licence: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    forbidden,
    notFound,
    serverError,
    unauthorized
  }
}
