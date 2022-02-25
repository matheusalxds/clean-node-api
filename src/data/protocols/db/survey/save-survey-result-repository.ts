export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultRepository.Params) => Promise<void>
}

export namespace SaveSurveyResultRepository {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
}
