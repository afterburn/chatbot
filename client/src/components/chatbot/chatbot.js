import React, { Component } from 'react'
import Brain from './brain.json'

import './chatbot.scss'

class Chatbot extends Component {
  constructor (props) {
    super(props)
    this.idCounter = 0
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    this.loadIntent('welcome')   
  }

  loadIntent (name) {
    if (Brain.hasOwnProperty(name)) {
      const intent = Brain[name]
      let messageCount = 0
      for (let i=0;i<intent.messages.length;i++) {
        const message = intent.messages[i]
        const ttl = message.ttl || 1000
        setTimeout(() => {
          const item = this.createMessage(this.idCounter, message.text, 'bot')
          const items = [...this.state.items, item]
          this.setState({ items })
          messageCount++

          if (messageCount === intent.messages.length) {
            setTimeout(() => {
              this.showChoices(intent)
            }, 1000)
          }
          this.idCounter++
        }, i * ttl)
      }
    }
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
      const item = this.createMessage(this.idCounter, choice.text, 'user')
      items.push(item)
      this.idCounter++

      this.setState({ items })
      setTimeout(() => {
        this.loadIntent(choice.intent)
      }, 1000)
    }, 300)
  }

  createMessage (key, text, type) {
    return <div key={key} className={'message-container ' + type}>
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