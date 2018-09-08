import FetchHelper from './fetch-helper'

class Queue {
  constructor (callback) {
    this.isProcessing = false
    this.queue = []
    this.callback = callback
  }

  enqueue (item) {
    this.queue.push(item)
    this.tryProcessNext()
  }

  dequeue () {
    this.isProcessing = true
    const item = this.queue.shift()
    const ttl = this.determineTTL(item)

    if (item.type === 'fetch') {
      if (item.key === 'weather') {
        FetchHelper.get(FetchHelper.resolve('weather'))
        .then(weatherData => {
          this.callback(item, weatherData)
          this.isProcessing = false
          this.tryProcessNext()
        })
      }
    } else {
      setTimeout(() => {
        this.callback(item)
        this.isProcessing = false
        this.tryProcessNext()
      }, ttl)
    }
  }

  tryProcessNext () {
    if (this.queue.length > 0 && this.isProcessing === false) {
      this.dequeue()
    }
  }

  determineTTL (item) {
    let ttl = 0
    if (item.index !== 0) {
      ttl = item.ttl || 1000
    }
    return ttl
  }
}

export default Queue