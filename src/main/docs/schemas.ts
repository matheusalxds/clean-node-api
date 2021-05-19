import {
  accountSchema,
  loginParamsSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  errorSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  surveyResultAnswerSchema
} from '@/main/docs/schemas/'

export default {
  account: accountSchema,
  addSurveyParams: addSurveyParamsSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  signUpParams: signUpParamsSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
