# Serverless-Node-Dynamodb-Boilerplate

This is Node.js based serverless api boilerplate with built in dynamodb support


## Features

- [Serverless](https://serverless.com/)
- Node.js
- Dynamodb support
- Offline support (using [serverless-offline](https://www.npmjs.com/package/serverless-offline) and docker)
- Example endpoints
- Circleci integration
- Secret management


## Requirements

- Node 8.10.0
- Serverless


## Installation

1. `npm install -g serverless`
2. `make setup`


## Developing locally

1. `make local`
2. `open http://localhost:3000`


## Handling secrets

We us a external file to store all secrets

- Encrypt `openssl aes-256-cbc -e -in .circlerc -out .circlerc-crypt -k $KEY`
- Decrypt `openssl aes-256-cbc -d -in .circlerc-crypt -out .circlerc -k $KEY`


## Versioning

This boilerplate uses [semantic versioning](http://semver.org/).


## Contributing

Want to contribute? Awesome. Just send a pull request.


## License

Serverless-Node-Dynamodb-Boilerplate is released under the [MIT License](http://www.opensource.org/licenses/MIT).
