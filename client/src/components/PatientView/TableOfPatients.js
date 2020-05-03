import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPatients } from "../../actions";

class TableOfPatients extends Component {
  componentDidMount() {
    this.props.fetchPatients();
    window.addEventListener("storage", () => setTimeout(() => {
      this.props.fetchPatients()
    }, 1000));
  }

  renderList() {
    return this.props.patients.map((patient) => {
      return (
        <div className="item" key={patient.email}>
          <div className="content">
            <div className="header">
              {`${patient.firstName[0]}. ${patient.lastName}`}
            </div>
            <div className="description">{`Checked in at ${patient.time}`}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Checked-In Patients</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { patients: Object.values(state.patients) };
};

export default connect(mapStateToProps, { fetchPatients })(TableOfPatients);
