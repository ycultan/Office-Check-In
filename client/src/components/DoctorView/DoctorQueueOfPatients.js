import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPatients, deletePatient } from "../../actions";
import { DoctorCurrentPatient } from "./DoctorCurrentPatient";

class DoctorQueueOfPatients extends Component {
  state = {currentPatient: localStorage.getItem('currentPatient') && JSON.parse(localStorage.getItem('currentPatient'))}
  componentDidMount() {
    this.props.fetchPatients();
  }

  onNextPatientClick(patient) {
    this.setState({currentPatient: patient})
    localStorage.setItem('currentPatient', JSON.stringify(patient))
    this.props.deletePatient(patient.email)
  }

  renderList() {
    return this.props.patients.map((patient) => {
      return (
        <div className="item" key={patient.email}>
          <div className="content">
            <div className="right floated content">
              <button
                onClick={() => this.onNextPatientClick(patient)}
                className="ui button primary"
              >
                See Next
              </button>
            </div>
            <div className="header">{`${patient.firstName} ${patient.lastName}`}</div>
            <div className="description">{`Checked-in at ${patient.time}`}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    const {currentPatient} = this.state
    return (
      <div className="ui divided equal width grid">
        <div className="column">
          {currentPatient ? <DoctorCurrentPatient patient={currentPatient} /> : <h2>Select a patient</h2>}
        </div>
        <div className="column">
          <h2>Current Queue of Patients</h2>
          <div className="ui celled list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { patients: Object.values(state.patients) };
};

export default connect(mapStateToProps, { fetchPatients, deletePatient })(
  DoctorQueueOfPatients
);
