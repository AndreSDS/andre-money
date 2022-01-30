import React from 'react'
import ReactDOM from 'react-dom'
import {createServer} from 'miragejs'
import {App} from './App'

createServer({
  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Desenvolvimento de web site',
          amount: 12000,
          category: 'Desenvolvimento',
          created_at: new Date()
        },
      ]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
