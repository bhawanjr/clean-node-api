import { DbLoadSurveyResult } from './db-load-survey-result'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRespositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRespositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRespositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRespositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRespositoryStub)
  return {
    sut,
    loadSurveyResultRespositoryStub
  }
}

describe('DbLoadSurveyResult Usecase', () => {
  const { sut, loadSurveyResultRespositoryStub } = makeSut()
  test('Should call LoadCurveyResultRepository', async () => {
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
