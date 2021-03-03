export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://local:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'mysecret!'
}
