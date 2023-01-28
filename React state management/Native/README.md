 # UseState Hook
 UseState hook is used to define a state that will be associated  with the component in which you have defined the state using useState hook.Output os the useState is an array whose first item is the current value of the piece of the state you have defined and second item is the setter function you call that function to set the value of that state.Whenever you will call a setState function that it will do two tasks 1st it will set the value of state and then queue a request to re-render to react 


Whenever react will call our functional component i.e function then react will add this function as component that will be responsible to render the particular part of the tree and there is also an array of the state data associated with the instance of this particular component.So with the help of below code we are putting that state array first slot as  empty string and use State is returning us the local copy of the string as well as the state setter.When you will give a value to the state setter then it will set the value in that state array and react will check is there any change in the state array and if it found any change in the array then it will re-render the component.   

 ````javascript
 const [search,setSearch]=useState("")
 const [result,setResult]=useState([])
 ````

This below code  does not work because  primitive data types are passed and return as value and not as reference while array or object is  passed and return as reference . So here count is not having the reference to that actual state while it is a local copy of the state , so this code does not changes the value of your state . 
return will return a set of react element - this return does not return DOM elements . Here we are returing a react element then those are added to the VDOm tree maintained by the React and once all the components in our tree are re-render then it diffs the new VDOM v/s existing VDOM tree and makes any changes. Once this component creates a DOM element then after that how many time you render it will do absolutely nothing to dom unless those value are changed. 

 ````javascript 
  import {useState} from "react"
function App() { 
  let [count,setCount]=useState(10)
  const onClick=(event)=>{
    count=count+1
  }
  return (
    <div className="App">
       <button onClick={onClick}>count:{count}</button>
    </div>
  );
}

export default App;

 ````
Each one of these component will maintain their own State this means that state is coupled with the instance of the component

````javascript
 import {useState} from "react"
function Count() { 
  const[count,setCount]=useState(10)
  const onClick=(event)=>{
    setCount(count+1)
  }
  return (
    <div className="App">
       <button onClick={onClick}>count:{count}</button>
    </div>
  );
}
function App() { 
  
  return (
    <div className="App">
      <Count/>
      <Count/>
      <Count/>
      <Count/>
      <Count/>
    </div>
  );
}

export default App;

````

useState in case of when state value is array or object 
````javascript
import { useState } from "react";


function App() {
  const [list, setList] = useState(["Robin", "Sunil", "Sushil"]);
  const [name, setName]=useState("")

  console.log("App is rendering ")

  const addName=(event)=>{ 
      // list.push(name) // here we are expecting that we have changed the state so re-render should happen but nothing such happen why because   we have made the changes to the list that refer to the state array in react that can be done by setList

      // setList(list) // this also does not work why because you make a request to the react to re-render but when react checks that both have te same reference then so it will not re-render - react does not check by content in it but it check by reference 

      setList([...list, name])
      setName("")
      /* 
      In react 17 and 18 these setters are in batch so  setList() will in queue a request and  set Name will also in-queue a request to render .React says that I have already got an one then it igonores the second request and when re-render happens all the changes are made

       */
      
  }
  
   
  return (
    <>
      {list.map((item, index) => (
        <h1>{item}</h1>
      ))}
      <input type="text"  onChange={(e)=>setName(e.target.value)} value={name} />
      <button onClick={addName}>Add Name</button>
    </>
  );
}

export default App;
````

useSate can also take a function as staring point If you need some sort of the complex calculation to calculate the state then you can do that , you can  do all within that function  and that function is guaranteed and will only runs once when the component is first created 

## Are the setter function that use State provides you async in nature ?
NO ,they are synchronous in nature 

# useReducer 
It can be used as the replacement of the useState . In useReducer you can handle complex state very easily 

syntax:
````javascript
const [state,dispatch]=useReducer(reducerFunction,initialState)
````
useReducer takes two arguments -
1. reducer function - this function itself  takes two arguments 1. current state value and an action 
2. Initial state value 

useReducer returns an array whose first entry is state value and dispatch function that is used to invoke the reducer function and an object is provided to the dispatch that is action  and based on that ation action your reducer will update the state value 

````javascript
import { useReducer } from "react";

function UseReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      console.log("i am here ")
      switch (action.type) {
        case "SET_NAME": 
          return { ...state, name: action.payload };
        case "ADD_NAME":
          return {...state ,names:[...state.names, state.name], name:"" }
      }
    },
    { names: [], name: "" }
  );

  return (
    <>
    {
      state.names && state.names.map((name)=>{ 
       return  <h1>{ name}</h1>
      })
    }
      <input
        type="text" value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
      <button onClick={(e)=>dispatch({type:"ADD_NAME"})}>Add Name </button>
      <div>name:{state.name}</div>
    </>
  );
}

export default UseReducer;

````


# useMemo:

An way to maintain   the state .
useMemo think like use calculated value 
LEt say you have an array and entries are like 10,20,30 and you want to add these all numbers - you can use reduce and this will give you the result bit lest say that this array is huge and each time your app will re-render then it will calculate this whole array that would be very costly so to save yourself from that you can use useMemo hooks that will take two arguments one the function that will calculate the value for you  and other is the dependency array that will contain anything as whole like an array , an object on which your calculation function will take place means that every  entry of your array or object.
````javascript
import {useState,useMemo} from 'react'

function UseMemo_useCallback() {
    const[array,setArray]=useState([10, 20, 30])

    // const total=array.reduce((acc,curr)=>acc+curr,0)

    const total=useMemo(array.reduce((acc,curr)=>acc+curr,0),
    [array])
  return (
    <div>total:{total}</div>
  )
}

export default UseMemo_useCallback
````
Here this total value will be calculated only when this array value is changed. 

Cases where you want to use Memo -
1. any type of complex calculation that you  want to calculate only specific times not on every render 
2. when you are creating an array or an object that is because react compares array and object by reference 

Let say that you have an list of the name you want to sort this array using the ort method so this will sort your array in place and every time this render will take place this sort is going to run again  and again  so we can use here our useMemo hook.First there could be chance that these arrayList could be of very large and the other reason to useMemo here is that there is creation of an array or object 

````javascript
import {useState,useMemo} from 'react'

function UseMemo_useCallback() {
    const[array,setArray]=useState([10, 20, 30])

    // const total=array.reduce((acc,curr)=>acc+curr,0)

    const total=useMemo(()=>array.reduce((acc,curr)=>acc+curr,0),
    [array])

    const [namesList]=useState(["Robin", "Sunil", "Rohit", "Aditya"])

    // const sortedList=namesList.sort() // will mutate the array and will return you the reference of the array but content of the array will be mutated 

    // const sortedList=[...namesList].sort()   

    const sortedList=useMemo(()=>[...namesList].sort(),[namesList]) 
    //as the nameList will change we wan to run this sort again 
  return (
    <>
    <div>total:{total}</div>
    <div>namesList:{namesList}</div>
    <div>sortedList:{sortedList}</div>
    </>
  )

}

export default UseMemo_useCallback
````

When to not use useMemo-
1. very simple calculations- num1+num2
2.and if it results into a scaler 

Myths around useMemo:
1. It  is connected to reactMemo- these two are not connected , both are completety differ
2. it is a performance killer- it is a single level memorization - it will just look over the   the dependent array if it is same then it will return you the same value otherwise it will created a new value and returns to you but it is only at a single level - so problem in performance 

