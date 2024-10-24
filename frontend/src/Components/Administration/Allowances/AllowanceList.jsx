import React, { useState } from 'react';
import './AllowanceList.css';

const AllowancesPage = () => {
    const [allowances, setAllowances] = useState([
        { id: 1, name: 'Housing', amount: 1000, type: 'Monthly' },
        { id: 2, name: 'Transport', amount: 300, type: 'Monthly' },
        { id: 1, name: 'Housing', amount: 1000, type: 'Monthly' },
        { id: 2, name: 'Transport', amount: 300, type: 'Monthly' }
    ]);
    const [editingAllowance, setEditingAllowance] = useState(null);
    const [allowanceForm, setAllowanceForm] = useState({ name: '', amount: '', type: '' });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllowanceForm({ ...allowanceForm, [name]: value });
    };

    // Handle adding a new allowance
    const handleAddAllowance = (e) => {
        e.preventDefault();
        if (editingAllowance) {
            // Edit existing allowance
            const updatedAllowances = allowances.map((allowance) =>
                allowance.id === editingAllowance.id ? { ...allowanceForm, id: editingAllowance.id } : allowance
            );
            setAllowances(updatedAllowances);
            setEditingAllowance(null); // Clear editing state
        } else {
            // Add new allowance
            const newAllowance = { ...allowanceForm, id: Date.now() };
            setAllowances([...allowances, newAllowance]);
        }
        setAllowanceForm({ name: '', amount: '', type: '' }); // Reset form
    };

    // Handle edit button click
    const handleEdit = (id) => {
        const allowanceToEdit = allowances.find((allowance) => allowance.id === id);
        setAllowanceForm(allowanceToEdit); // Pre-fill form with selected allowance
        setEditingAllowance(allowanceToEdit); // Set editing state
    };

    // Handle delete button click
    const handleDelete = (id) => {
        const updatedAllowances = allowances.filter((allowance) => allowance.id !== id);
        setAllowances(updatedAllowances);
    };

    return (
        <div className="allowances-page">
            <h2 className='allowances-heading'>Manage Allowances</h2>

            <div className="allowance-form">
                <form onSubmit={handleAddAllowance}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Allowance Name"
                        value={allowanceForm.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={allowanceForm.amount}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="type"
                        placeholder="Type (e.g., Monthly)"
                        value={allowanceForm.type}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <button type="submit">{editingAllowance ? 'Update Allowance' : 'Add Allowance'}</button>
                </form>
            </div>

            <div className="allowances-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allowances.map((allowance) => (
                            <tr key={allowance.id}>
                                <td>{allowance.name}</td>
                                <td>{allowance.amount}</td>
                                <td>{allowance.type}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(allowance.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(allowance.id)}
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
