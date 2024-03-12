import { LoadSurveyResult, SurveyResultModel, LoadSurveyResultRepository } from './db-load-survey-result.protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(private readonly loadSurveyResultRepository: LoadSurveyResultRepository) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyResult
  }
}
