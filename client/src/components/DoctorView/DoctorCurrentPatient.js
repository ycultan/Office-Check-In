import React from "react";

export const DoctorCurrentPatient = ({ patient }) => {
  return (
    <div>
      <h2>Current Patient</h2>
      <div className="ui card">
        <div className="content">
          <div className="header">{`${patient.firstName} ${patient.lastName}`}</div>
          <div className="meta">{patient.email}</div>
          <div className="description">
            {patient.description && patient.description}
          </div>
        </div>
      </div>
    </div>
  );
};
