import React, { Component } from 'react'
import './app-wrapper.scss'

class AppWrapper extends Component {
  render () {
    return <div className='app'>
      { this.props.children }
    </div>
  }
}

export default AppWrapper
