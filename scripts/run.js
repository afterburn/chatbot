const path = require('path')
const spawnProcess = require('./spawn-process')

const webpack = spawnProcess('npm', ['run', 'watch'], { cwd: path.join(__dirname, '..') })
const server = spawnProcess('npm', ['run', 'watch-server'], { cwd: path.join(__dirname, '..') })