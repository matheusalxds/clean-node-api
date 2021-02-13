
[![Build Status](https://travis-ci.org/matheusalxds/clean-node-api.svg?branch=master)](https://travis-ci.org/matheusalxds/clean-node-api)
[![Coverage Status](https://coveralls.io/repos/github/matheusalxds/clean-node-api/badge.svg)](https://coveralls.io/github/matheusalxds/clean-node-api)
> # Clean Architecture
![alt text](./public/logo.png "Clean Architecture")

> ## Principles
* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)
* Composition Over Inheritance
* Small Commits

> ## Design Patterns
* Factory
* Adapter
* Composite
* Decorator
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root
* Builder

> ## Methodologies and Designs

> ## Libs and Tools
* NPM
* Typescript
* Git
* Docker
* Jest
* MongoDb
* Travis CI
* Swagger
* Bcrypt
* JsonWebToken
* Faker
* Coveralls
* Validator
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Sucrase
* Nodemon
* Rimraf
* In-Memory MongoDb Server
* MockDate
* Module-Alias
* [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter) - To force us to respect the rules of commit convention.
* [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript) - It's necessary to use lint and Typescript.

> ## Good practices
[Commits](https://www.conventionalcommits.org/en/v1.0.0/) we're gonna follow this convention.

> ### Comments
We should commit first the production file first using
**feat: ...** and for test file
**test: ...**

> ### Tests
- We must create SUT (create factory).
- We must guarantee the integration between components (DI)
- We must return error if some integration return false
(some DI return error)

