const path = require('path')
const request = require('request')
const express = require('express')

const app = express()
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.get('/weather', (req, res) => {
  // Simulate long asynchronous action.
  setTimeout(() => {
    res.json({ city: 'Leeuwarden', temperature: 18 })
  }, 3000)
})

app.listen(3000, () => {
  console.log('watson listening on http://localhost:3000')
})