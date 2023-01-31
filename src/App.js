import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { createClient } from '@supabase/supabase-js'

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  async handleClick() {
    const supabaseUrl = 'https://umtwwxslxtpghthnwist.supabase.co'
    const supabase = createClient(supabaseUrl, process.env.REACT_APP_SUPABASE_KEY)
    const { data } = await supabase.from('greetings').select('greeting')
    console.log(data)
    this.setState({ loading: true })

    fetch("/.netlify/functions/hello")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={async() => await this.handleClick()}>{loading ? "Loading..." : "Call Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
