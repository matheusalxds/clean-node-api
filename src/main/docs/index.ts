import paths from '@/main/docs/paths'
import components from '@/main/docs/components'
import schemas from '@/main/docs/schemas'

export default {
  openapi: '3.0.0',
  description: 'This is Clean Architecture\'s API documentation',
  info: {
    title: 'Clean Node API',
    description: 'Mango\'s course to create surveys between programmers',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  contact: {
    name: 'API Support',
    email: 'mathe.system@gmail.com'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [
    { name: 'Login' },
    { name: 'Survey' }
  ],
  paths,
  schemas,
  components
}
