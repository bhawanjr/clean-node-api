import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResultRepository {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return null
  }
}