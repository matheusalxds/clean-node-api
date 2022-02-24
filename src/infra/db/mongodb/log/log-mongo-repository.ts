import { LogErrorRepository } from '@/data/protocols/db/log'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
