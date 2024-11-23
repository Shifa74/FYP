import React, { useEffect, useState } from "react";
import "./AllowanceList.css";
import axios from "axios";

const AllowancesPage = () => {
  const [allowances, setAllowances] = useState([]);
  const [editingAllowance, setEditingAllowance] = useState(null);
  const [allowanceForm, setAllowanceForm] = useState({
    allowanceType: "",
    amount: "",
  });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllowanceForm({ ...allowanceForm, [name]: value });
    setError("");
  };

  const fetchAllowances = async () => {
    try {
      const res = await axios.get("/allowance/get");
      setAllowances(res.data);
    } catch (error) {
      console.log("Error fetching allowances", error.message);
    }
  };

  useEffect(() => {
    fetchAllowances();
  }, []);
  // Handle adding a new allowance
  const handleAddAllowance = async (e) => {
    e.preventDefault();
    if (!allowanceForm.allowanceType || !allowanceForm.amount) {
      setError("Both fields are required.");
      return;
    }

    if (Number(allowanceForm.amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    try {
      if (editingAllowance) {
        await axios.put(
          `/allowance/edit/${editingAllowance._id}`,
          allowanceForm
        );
        setEditingAllowance(null); // Clear editing state
      } else {
        await axios.post("/allowance/add", allowanceForm);
      }
      fetchAllowances();
      setAllowanceForm({ allowanceType: "", amount: "" }); // Reset form
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Handle edit button click
  const handleEdit = (id) => {
    const allowanceToEdit = allowances.find(
      (allowance) => allowance._id === id
    );
    setAllowanceForm(allowanceToEdit); // Pre-fill form with selected allowance
    setEditingAllowance(allowanceToEdit); // Set editing state
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/allowance/delete/${id}`);
      const updatedAllowances = allowances.filter(
        (allowance) => allowance._id !== id
      );
      setAllowances(updatedAllowances);
    } catch (error) {
      
      console.log("Error deleting allowance", error.message);
    }
  };

  return (
    <div className="allowances-page">
      <h2 className="allowances-heading">Manage Allowances</h2>

      <div className="allowance-form">
        {error && <p className="err-mess">{error}</p>}
        <form onSubmit={handleAddAllowance} noValidate>
          <input
            type="text"
            name="allowanceType"
            placeholder="Allowance Name"
            value={allowanceForm.allowanceType}
            onChange={handleInputChange}
            // className={error ? "err-mess1" : ""}
            className={!allowanceForm.allowanceType && error ? "err-mess1" : ""}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={allowanceForm.amount}
            onChange={handleInputChange}
            // className={error ? "err-mess1" : ""}
            className={
              Number(allowanceForm.amount) <= 0 && error ? "err-mess1" : ""
            }
            // className="err-mess1"
            required
          />

          <button type="submit">
            {editingAllowance ? "Update Allowance" : "Add Allowance"}
          </button>
        </form>
      </div>

      <div className="allowances-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allowances.map((allowance) => (
              <tr key={allowance._id}>
                <td>{allowance.allowanceType}</td>
                <td>{allowance.amount}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="allowances-edit-btn"
                      onClick={() => handleEdit(allowance._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="allowances-delete-btn"
                      onClick={() => handleDelete(allowance._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllowancesPage;
