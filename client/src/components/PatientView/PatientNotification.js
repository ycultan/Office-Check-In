import React, { Component } from "react";

class PatientNotification extends Component {
  state = {
    currentPatient:
      localStorage.getItem("currentPatient") &&
      JSON.parse(localStorage.getItem("currentPatient")),
  };

  componentDidMount() {
    window.addEventListener("storage", (e) =>
      this.setState({ currentPatient: JSON.parse(e.newValue) })
    );
  }

  renderCurrentPatient() {
    const { currentPatient } = this.state;
    return (
      <div>
        <h2>Currently seeing</h2>
        <div className="ui huge message">
          {`${currentPatient.firstName[0]}. ${currentPatient.lastName}`}
        </div>
      </div>
    );
  }

  render() {
    const { currentPatient } = this.state;
    
    return (
      <div>
        {currentPatient ? (
          this.renderCurrentPatient()
        ) : (
          <h2>Please wait to be seen</h2>
        )}
      </div>
    );
  }
}

export default PatientNotification;
