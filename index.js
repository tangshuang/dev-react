#!/usr/bin/env node

const shell = require('shelljs')
const path = require('path')

const entry = process.argv[2]
if (!entry) {
  throw new Error(`entry file required.`)
}

const cwd = process.cwd()
const file = path.resolve(cwd, entry)

const options = require('process.args')(entry)
const { port = 9000, host = '127.0.0.1', root, webpackconfig } = options
const rootDir = root ? path.resolve(cwd, root) : ''
const webpackConfigFile = webpackconfig ? path.resolve(cwd, webpackconfig) : ''

shell.cd(__dirname)
shell.exec(`ENTRY="${file}" PORT="${port}" HOST="${host}" CWD="${cwd}" ROOT="${rootDir}" WEBPACK_CONFIG="${webpackConfigFile}" ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config=./source/webpack.config.js`)
