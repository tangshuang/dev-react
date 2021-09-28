#!/usr/bin/env node

const shell = require('shelljs')
const path = require('path')

const entry = process.argv[2]
const options = require('process.args')(entry)
const { port, tsconfig, root, webpackconfig } = options
const cwd = process.cwd()
const file = path.resolve(cwd, entry)
const rootDir = path.resolve(cwd, root)
const webpackConfigFile = path.resolve(cwd, webpackconfig)

shell.cd(__dirname)
shell.exec(`ENTRY="${file}" PORT=${port} CWD="${cwd}" TS_CONFIG="${tsconfig}" ROOT="${rootDir}" WEBPACK_CONFIG="${webpackConfigFile}" ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config=./source/webpack.config.js`)
