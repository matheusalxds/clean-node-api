import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        surveys : [Survey!]!
    }
    
    type Survey {
      id: String!
      question: String!
      answers: [SurveyAnswer!]!
      date: DateTime!
      didAnswer: Boolean
    }

    type SurveyAnswer {
      image: String
      answer: String!
    }

`
