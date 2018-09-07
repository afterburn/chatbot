const spawn = require('cross-spawn')

module.exports = (cmd, args, opts) => {
  const p = spawn(cmd, args, opts)
  p.stdout.on('data', d => console.log(d.toString().trim()))
  p.stdout.on('error', e => console.log(e.toString().trim()))
  p.on('error', e => console.log(e))
  p.on('close', c => console.log('process exited, code:', c))
}