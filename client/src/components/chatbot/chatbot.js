import React, { Component } from 'react'
import { FetchHelper, Queue } from '../../helpers'
import Brain from './brain.json'

import './chatbot.scss'

class Chatbot extends Component {
  constructor (props) {
    super(props)
    this.idCounter = 0
    this.messageCount = 0
    this.messageQueue = new Queue((item) => this.onItemDequeued(item), (item, meta) => this.onResponse(item, meta))
    this.currentIntent = null
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    this.loadIntent('welcome')   
  }

  loadIntent (name) {
    if (Brain.hasOwnProperty(name)) {
      this.messageCount = 0
      const intent = this.currentIntent = Brain[name]
      for (let i=0;i<intent.messages.length;i++) {
        const message = intent.messages[i]
        this.messageQueue.enqueue({ ...message, index: i })
      }
      this.messageQueue.enqueue({ choices: intent.choices })
    }
  }

  onItemDequeued (item) {
    const isMessage = !item.hasOwnProperty('choices')
    if (isMessage === true) {
      this.appendMessage(item)
      this.messageCount++
    } else {
      this.showChoices(this.currentIntent)
    }
  }

  appendMessage (message) {
    const type = message.type || 'default'
    if (type === 'default') {
      const item = this.createMessageElement(this.idCounter, message.text, 'bot')
      const items = [...this.state.items, item]
      this.setState({ items })
    }
    if (type === 'fetch') {
      const item = this.createMessageElement(this.idCounter, '...', 'bot')
      const items = [...this.state.items, item]
      this.setState({ items })
    }
    this.idCounter++
  }

  onResponse (message, meta) {
    switch (message.key) {
      case 'weather': {
        this.updateMessageElement(this.idCounter - 1, `It will be around ${meta.temperature} degrees Celsius in ${meta.city} today.`)
        break
      }
    }
  }

  updateMessageElement (id, message) {
    const items = [...this.state.items]
    const item = document.body.querySelector(`.message-container[data-id="${id}"] .message`)
    item.innerHTML = message
  }

  showChoices (intent) {
    const choices = intent.choices.map((choice, i) => {
      return <div onClick={() => this.selectChoice(choice)} className='choice' key={i}>{choice.text}</div>
    })
    const item = <div className='choices' key={this.state.items.length}>{choices}</div>
    const items = [...this.state.items, item]
    this.setState({ items })
  }

  selectChoice (choice) {
    const items = [...this.state.items]
    items.pop()
    Array.from(document.body.querySelectorAll('.choices .choice'))
      .forEach(choiceElement => choiceElement.classList.add('fade-out'))
    
    setTimeout(() => {
      const item = this.createMessageElement(this.idCounter, choice.text, 'user')
      items.push(item)
      this.idCounter++

      this.setState({ items })
      setTimeout(() => {
        this.loadIntent(choice.intent)
      }, 1000)
    }, 300)
  }

  createMessageElement (key, text, type) {
    return <div key={key} data-id={key} className={'message-container ' + type}>
      <div className='message'>{text}</div>
    </div>
  }

  render () {
    return <div className='chatbot'>
      <div className='items'>{this.state.items}</div>
    </div>
  }
}

export default Chatbot