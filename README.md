[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/MartinLedel/jsramverk-api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/MartinLedel/jsramverk-api/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/MartinLedel/jsramverk-api/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/MartinLedel/jsramverk-api/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/MartinLedel/jsramverk-api/badges/build.png?b=master)](https://scrutinizer-ci.com/g/MartinLedel/jsramverk-api/build-status/master)

[![Build Status](https://travis-ci.org/MartinLedel/jsramverk-api.svg?branch=master)](https://travis-ci.org/MartinLedel/jsramverk-api)

## Setup

1. Clone the repo with `git clone https://github.com/MartinLedel/jsramverk-api`
2. Run `npm install` to install all dependencies
3. Create the folder `config` with the file `config.json`
4. Add a key called secret which will be based on the jwt token
5. In db create texts.sqlite
6. Use migrate.sql to setup the db with texts.sqlite
7. Run `npm run start`
8. It now runs on `http://localhost:1337/`
