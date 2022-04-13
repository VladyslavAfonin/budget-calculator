import { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

// const initialExpenses = [
//   {id: uuidv4(), charge: "rent", amount: 300},
//   {id: uuidv4(), charge: "booking", amount: 400},
//   {id: uuidv4(), charge: "products", amount: 500}
// ]

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem("expenses")) : [];

function App() {

  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState("")
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses])

  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    }, 3000)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== "" && amount > 0) {
      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type: "success", text: "Item edited"})
      } else {
        const singleExpense = {id: uuidv4(), charge, amount}
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: "success", text: "Item added"});
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({type: "danger", text: "Charge can't be empty value, amount value has to be bigger than zero"});
    }
  }

  const clearAllItems = () => {
    setExpenses([]);
    handleAlert({type: "danger", text: "All items deleted"});
  }

  const deleteItem = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: "danger", text: "Item deleted"});
  }

  const editItem = (id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit} />
        <ExpenseList expenses={expenses} deleteItem={deleteItem} editItem={editItem} clearAllItems={clearAllItems} />
      </main>
      <h1>Total spending: 
        <span className="total">
          $ {expenses.reduce((acc, current) => {
            return (acc += parseInt(current.amount));
          }, 0)}
        </span>
      </h1>
    </>
  )
}

export default App;
