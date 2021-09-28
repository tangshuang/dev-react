#!/usr/bin/env node

const shell = require('shelljs')
const path = require('path')

const entry = process.argv[2]
const options = require('process.args')(entry)
const { port, tsconfig } = options
const cwd = process.cwd()
const file = path.resolve(cwd, entry)

shell.cd(__dirname)
shell.exec(`ENTRY="${file}" PORT=${port} CWD="${cwd}" TS_CONFIG="${tsconfig}" ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config=./source/webpack.config.js`)
