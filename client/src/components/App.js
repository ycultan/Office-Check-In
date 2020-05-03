import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PatientCheckIn from "./PatientView/PatientCheckIn";
import TableOfPatients from "./PatientView/TableOfPatients";
import PatientNotification from "./PatientView/PatientNotification";
import DoctorQueueOfPatients from "./DoctorView/DoctorQueueOfPatients";

const App = () => {
  return (
    <div style={{ margin: "20px" }}>
      <div className="ui divided equal width grid">
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                <div className="column">
                  <PatientCheckIn />
                </div>
                <div className="column">
                  <TableOfPatients />
                </div>
                <div className="column">
                  <PatientNotification />
                </div>
              </>
            )}
          />

          <Route
            path="/doctor"
            render={(props) => (
              <div className="column">
                <DoctorQueueOfPatients />
              </div>
            )}
          />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
