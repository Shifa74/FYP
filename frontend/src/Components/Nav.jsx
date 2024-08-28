import React from 'react';
import './Nav.css';
import { BarChart3, Users, Receipt, SquarePlus, NotepadTextDashed } from 'lucide-react';

const App = () => {
  return (
    <div className="bottom-divs">
      <div className="bottom-div">
        <BarChart3 size={40} className="icon" />
        <div className="bottom-div-content">
          <div className="bottom-div-text">Dashboard</div>
          <div className="bottom-div-subtext">Overview of activities</div>
        </div>
      </div>
      <div className="bottom-div">
        <Users size={40} className="icon" />
        <div className="bottom-div-content">
          <div className="bottom-div-text">EMPLOYEES</div>
          <div className="bottom-div-subtext">List & new entries</div>
        </div>
      </div>
      <div className="bottom-div">
        <Receipt size={40} className="icon" />
        <div className="bottom-div-content">
          <div className="bottom-div-text">Salary</div>
          <div className="bottom-div-subtext">Payroll details</div>
        </div>
      </div>
      <div className="bottom-div">
        <SquarePlus size={40} className="icon" />
        <div className="bottom-div-content">
          <div className="bottom-div-text">Allows.& Ded</div>
          <div className="bottom-div-subtext">Adjust allowances</div>
        </div>
      </div>
      <div className="bottom-div">
        <NotepadTextDashed size={40} className="icon" />
        <div className="bottom-div-content">
          <div className="bottom-div-text">Administration</div>
          <div className="bottom-div-subtext">Manage settings</div>
        </div>
      </div>
    </div>
  );
};

export default App;
