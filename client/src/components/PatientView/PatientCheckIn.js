import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { createPatient } from "../../actions";

class PatientCheckIn extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextarea = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea {...input} />
      </div>
    );
  };

  onSubmit = (values) => {
    this.props.createPatient({...values, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})
    .then(() => {
        this.props.dispatch(reset("patientCheckIn"));
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <h2>Please Check-In</h2>
        <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
          <Field
            name="firstName"
            component={this.renderInput}
            label="First Name"
          />
          <Field
            name="lastName"
            component={this.renderInput}
            label="Last Name"
          />
          <Field name="email" component={this.renderInput} label="Email" />
          <Field
            name="description"
            component={this.renderTextarea}
            label="Description of Condition"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Please enter a first name";
  }

  if (!values.lastName) {
    errors.lastName = "Please enter a last name";
  }

  if (!values.email) {
    errors.email = "Please enter an email";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "patientCheckIn",
  validate,
})(PatientCheckIn);

export default connect(null, { createPatient })(formWrapped);
