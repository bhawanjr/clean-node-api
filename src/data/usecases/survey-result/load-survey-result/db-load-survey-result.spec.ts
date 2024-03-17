import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result.protocols'
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/data/test'
import { mockSurveyResultModel, mockSurveyResultWithNoAnswersModel, throwError } from '@/domain/test'
import MockDate from 'mockdate'


type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRespositoryStub: LoadSurveyResultRepository,
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRespositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRespositoryStub, loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyResultRespositoryStub,
    loadSurveyByIdRepositoryStub
  }
}

let surveyId: string
let accountId: string

describe('DbLoadSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = 'any_id'
    accountId = 'any_id'
  })

  test('Should call LoadCurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRespositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId')
    await sut.load(surveyId, accountId)
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyId, accountId)
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRespositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load(surveyId, accountId)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRespositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    await sut.load(surveyId, accountId)
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
  })

  test('Should return SurveyResultModel with all answers count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRespositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const surveyResult = await sut.load(surveyId, accountId)
    expect(surveyResult).toEqual(mockSurveyResultWithNoAnswersModel())
  })

  test('Should return surveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load(surveyId, accountId)
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
