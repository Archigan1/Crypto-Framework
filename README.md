[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Crypto Framework

> Welcome to the repository for the NodeJS package [crypto-framework!](https://npmjs.com/package/crypto-framework)
> This package is meant to be used for a building block to your own cryptocurrency.

## Prerequisites

This project requires NodeJS (version 8 or later) and npm.
[Node](http://nodejs.org/) and [npm](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Table of contents

- [Project Name](#crypto-framework)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [API](#api)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/Archigan1/Crypto-Framework.git
$ cd Crypto-Framework
```

To install and set up the library, run:

```sh
$ npm i --save-dev crypto-framework
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev crypto-framework
```

## API

Check our (future!) documentation page for API usage.

**NOTE:** The API *does, in fact, exist,* but we don't have any official documentation page yet. I'll sum it up here, with the classes and their methods (hover over the methods in the code for a description):

```ts
// Block class
Block(data: Array<Transaction>, previousHash: string | null);
Block.mine(difficulty: number);
Block.hasValidTransactions(chain: Chain): boolean;

// Chain class
Chain(chain: Array<Block>, difficulty: number);
static Chain.create(firstUserAddress: string): Chain;
Chain.addBlock(transactions: Array<Transaction>);
Chain.isValid(): boolean;
Chain.addTransaction(transaction: Transaction);

// Transaction class
Transaction(senderPubKey: string, receiverPubKey: string, amount: number);
Transaction.sign(wallet: Wallet);
Transaction.isValid(chain: Chain): string | number | boolean;

// Wallet class
Wallet();
Wallet.send(amount: number, receiver: string, blockchain: Chain);
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork the main branch
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request

## Credits

[ankanbag101](https://github.com/ankanbag101) - Making the blog post and [repository](https://github.com/ankanbag101/crypto-coin) that served as inspiration and much of the code for this repository

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Archigan1/Crypto-Framework/tags).

## Authors

* **Archigan1** - *Most of the programming behind this package* - [Archigan1](https://github.com/Archigan1)
* **CookieGamer733** - *Helped to debug and write some of the files. Also assisted with JSDoc.* - [CookieGamer733](https://github.com/CookieGamer733)
* **Terrain2** - *Helped to debug without touching the files* - [Terrain2](https://github.com/Terrain2)

See also the list of [contributors](https://github.com/Archigan1/Crypto-Framework/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2022) © Andrea SonnY
