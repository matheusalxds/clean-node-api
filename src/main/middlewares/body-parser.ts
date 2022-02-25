import { json, RequestHandler } from 'express'

export const bodyParser = json() as RequestHandler
