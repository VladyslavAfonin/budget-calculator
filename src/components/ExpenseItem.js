import React from 'react'
import {MdEdit, MdDelete} from "react-icons/md"

const ExpenseItem = ({expense, deleteItem, editItem}) => {
    
    const {id, charge, amount} = expense;

    return (
        <li className='item'>
            <div className="info">
                <span className="expense">{charge}</span>
                <span className='amount'>${amount}</span>
            </div>
            <div>
                <button className="edit-btn" aria-label='edit button' onClick={() => editItem(id)}><MdEdit /></button>
                <button className="clear-btn" aria-label='clear button' onClick={() => deleteItem(id)} ><MdDelete /></button>
            </div>
        </li>
    )
}

export default ExpenseItem;