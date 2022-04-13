import React from 'react'
import Item from "./ExpenseItem";
import {MdDelete} from "react-icons/md"

const ExpenseList = ({expenses, deleteItem, editItem, clearAllItems}) => {
    return (
        <>
            <ul className='list'>
                {expenses.map(expense => {
                    return <Item key={expense.id} expense={expense} deleteItem={deleteItem} editItem={editItem} />
                })}
            </ul>
            {
                expenses.length > 0 && 
                <button className="btn" onClick={clearAllItems}>
                    Clear Expenses
                    <MdDelete className='btn-icon' />
                </button>
            }
        </>
    )
}

export default ExpenseList;