import React from 'react'
import EmployeesList from './EmployeesList'
import AddEmployeeForm from './AddEmployeeForm'

class App extends React.Component {

  state = {
    employees: [],
    activePanel: "EmployeesList"
  }

  componentDidMount() {
    fetch(`http://localhost:3004/employees`)

      .then(resp => resp.json())
      .then(resp => {

        this.setState((prevState, props) => ({
          employees: resp
        }))
      })
  }

  refreshEmployees = event => {

    return fetch(`http://localhost:3004/employees`)

      .then(resp => resp.json())
      .then(resp => {

        this.setState((prevState, props) => ({
          employees: resp
        }))

      })
  }

  changeActivePanel = (activePanelName) => {
    this.setState((prevState, props) => ({
      activePanel: activePanelName
    }))
  }

  render() {

    if (this.state.activePanel === "EmployeesList") {

      return (
        <div>

          <EmployeesList employees={this.state.employees}
            refreshEmployees={this.refreshEmployees}
            changeActivePanel={this.changeActivePanel} activePanel={this.state.activePanel} />

        </div>
      )
    } else {
      return (
        <div>

          <AddEmployeeForm refreshEmployees={this.refreshEmployees} changeActivePanel={this.changeActivePanel} activePanel={this.state.activePanel} />

        </div>
      )
    }

  }
}

export default App