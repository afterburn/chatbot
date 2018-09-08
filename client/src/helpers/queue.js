import FetchHelper from './fetch-helper'

class Queue {
  constructor (onDone, onUpdate) {
    this.isProcessing = false
    this.queue = []
    this.onDone = onDone
    this.onUpdate = onUpdate
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
      setTimeout(() => {
        this.onDone(item)
      }, ttl)
      if (item.key === 'weather') {
        FetchHelper.get(FetchHelper.resolve('weather'))
        .then(weatherData => {
          this.onUpdate(item, weatherData)
          this.isProcessing = false
          this.tryProcessNext()
        })
      }
    } else {
      setTimeout(() => {
        this.onDone(item)
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