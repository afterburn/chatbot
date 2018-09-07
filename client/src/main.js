import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, hashHistory } from 'react-router-dom'

import AppWrapper from './components/app-wrapper'
import IndexRoute from './routes/index'

ReactDOM.render(
  <AppWrapper>
    <Router history={ hashHistory }>
      <Switch>
        <Route exact path='/' component={ IndexRoute } />
      </Switch>
    </Router>
  </AppWrapper>,
	document.getElementById('root')
)