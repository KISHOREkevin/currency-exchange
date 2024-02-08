import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Curconvert = () => {
    let [inputData,setInputData] = useState({
        amount:1,
        fromcurrency:"USD",
        tocurrency:"INR"
    });
    let [convertedAmount,setConvertedAmount] = useState(null);
    let [loading,setLoading] = useState(true);
    let [errorMsg,setErrorMsg] = useState("");
    let inputHandler = (e)=>{
        let {name,value} = e.target;
        setInputData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
       
    }
    useEffect(()=>{
        let fetchData = async ()=>{
            try {
                let response = await axios.get(`https://api.vatcomply.com/rates?base=${inputData.fromcurrency}`);
                let data = response.data.rates;
                setLoading(true);
                setConvertedAmount(data[inputData.tocurrency]);
                setLoading(false);
            } catch (error) {
                setErrorMsg(error.response.data.base);
            }
        }
        fetchData();
    },[])
    let submitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            
            let response = await axios.get(`https://api.vatcomply.com/rates?base=${inputData.fromcurrency}`);
            let data = response.data.rates;
            
            setConvertedAmount(data[inputData.tocurrency]);
            
        } catch (error) {
            setErrorMsg(error.response.data.base);
        }
       setLoading(false);
    }
    
  return (
    <div className='bg-secondary p-5 w-72  rounded-md shadow-lg'>
        <form onSubmit={submitHandler}>
            <label htmlFor="amount">Amount :</label><br />
            <input onChange={inputHandler} className='w-full text-xl rounded-md p-2' type="number" id='amount' name='amount' required  value={inputData.amount} /><br /><br />
            <label htmlFor="fromcurrency">From :</label><br />
            <select onChange={inputHandler} className='w-full p-2 rounded-md bg-tertiary text-center hover:bg-gray-300' name="fromcurrency" id="fromcurrency" defaultValue={inputData.fromcurrency}  required>
                <option  disabled value={""}>-- select option --</option>
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="MYR">MYR - Malaysian Ringgit</option>
            </select><br /><br />
            <label htmlFor="tocurrency">To :</label><br />
            <select onChange={inputHandler} className='w-full p-2 rounded-md bg-tertiary text-center hover:bg-gray-300'  name="tocurrency" id="tocurrency" defaultValue={inputData.tocurrency} required>
                <option  disabled value={""}>-- select option --</option>
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="MYR">MYR - Malaysian Ringgit</option>
            </select><br /><br />
            <div className='bg-tertiary text-center p-3 rounded-md'>
                {loading ? 
                 <p className='text-center'>Loading ...</p>
                 : 
                 `${inputData.amount} (${inputData.fromcurrency}) = ${(convertedAmount*inputData.amount).toFixed(3)} (${inputData.tocurrency})`  }
               
            </div><br />
            {loading? 
                 <button className='text-center cursor-wait bg-gray-300 text-gray-400 w-full p-2' type='submit' disabled>Convert !!!</button>
                :
                 <button className='text-center bg-final text-white w-full p-2 rounded-md hover:bg-white hover:text-final' type='submit'>Convert !!!</button>
            }
           
        </form>
    </div>
  )
}

export default Curconvert