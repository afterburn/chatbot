const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.listen(3000, () => {
  console.log('watson listening on http://localhost:3000')
})