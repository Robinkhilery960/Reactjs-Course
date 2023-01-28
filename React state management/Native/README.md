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

# useCallback  : 
Let say you have a lost of the names and you want to sort them using our own defined sort function , this is how you will do that 
````javascript
import React, { useState,useMemo } from 'react'

 const SortList=({nameList,sortFn})=>{
     console.log("sortList is rendering")
return  useMemo(()=>{
    console.log("useMemo is running")
   return  [...nameList].sort(sortFn)
},[nameList,sortFn])
}

function UseMemo_useCallback() {
    const [counter,setCounter]=useState(10)
    const [nameList]=useState(["Robin", "Rohit", "Ajay", "Prem"])
    console.log(nameList)
    const sortFunc=(a, b)=>a.localeCompare(b)*-1
  return (
    <>
    <div>nameList:{nameList}</div>
    <div><SortList nameList={nameList} sortFn={sortFunc}/></div>
    <div>{counter}</div>
    <button onClick={()=>setCounter(counter+1)}>Increase counter</button>
    </>
  )
}

export default UseMemo_useCallback
````

But the issue wih the above code is that it actually alter the use of useMemo that was yu want to sort the array only when the dependencies changes like the nameList Array. Every time  the   UseMemo_useCallback function render the sort is also called but we don;t want that . So how to avoids that actually -
1. define your sort function as globally so that every time your UseMemo_useCallback function is called so you don't creates a new sortFunc for you which have a new reference.
2. You uses the callback while defining that function  so    that function is defined only when the dependencies array changes

````javascript
import React, { useState,useMemo ,useCallback} from 'react'

 const SortList=({nameList,sortFn})=>{
     console.log("sortList is rendering")
return  useMemo(()=>{
    console.log("useMemo is running")
   return  [...nameList].sort(sortFn)
},[nameList,sortFn])
}

function UseMemo_useCallback() {
    const [counter,setCounter]=useState(10)
    const [nameList]=useState(["Robin", "Rohit", "Ajay", "Prem"])
    console.log(nameList)

    const sortFunc= useCallback((a, b)=>a.localeCompare(b) *-1,[])

  return (
    <>
    <div>nameList:{nameList}</div>
    <div><SortList nameList={nameList} sortFn={sortFunc}/></div>
    <div>{counter}</div>
    <button onClick={()=>setCounter(counter+1)}>Increase counter</button>
    </>
  )
}

export default UseMemo_useCallback
````
By using callback we are actually making that reference remain the same.Here sortFunc is created once only when the first time the UseMemo_useCallback render 

When to use useCallback:
1. If you are creating a callback   is going on the nested component   as a property this case we are passing sortFunction as property to the sortedList and you don't now the internal of sortedList , so make sure that you stabilize the reference that you send to the nested component 
2. When you are creating a custom hook because you have no idea that the component that is going to use your hook 

When to not use useCallback:
1. If you are using a simple input not use callback it will be overkill 


# useEffect  :
1. We uses this for mostly making api request 

useEffect  will allow us to say that only do this thing once
useEffect takes a function that is going to call once the dom is rendered  or whenever you react wants to call your useEffect  that is whenever  you dependencies array will change it is going to call it 

````javascript
import React, { useEffect, useState } from 'react'

function UseEffect() {
    const [names,setNames]=useState([])
 
   useEffect(()=>{
    fetch("/names.json")
    .then((res)=>res.json())
    .then((data)=>setNames(data))
   },[])
   
  return (
    <div>names:{names.join(" ")}</div>
  )
}

export default UseEffect
````
Why useEffect is called two times on every render ?

In react 18 every time it render a component in dev mode with strict mode enabled it mounts it which renders it , it unmounts it which in the case of useEffect should call a cleanup function which we have not defines in use Effect here  and then it remounts again it and that remounting calls the useEffect again  - so it is called twice 

If you dot want that then you can  remove the strict mode from your app in index.js. It only happens in the dev mode not in the production  

The below code is working fine but thats not how you should use The useEffect in your code instead you should only use Effect when it is needed for example in the code below you can see that.

````javascript
import React, { useEffect, useState } from 'react'

function UseEffect() {
    const [names,setNames]=useState([])

    console.log(names)
   useEffect(()=>{
    fetch("/names.json")
    .then((res)=>res.json())
    .then((data)=>setNames(data))
   },[])

   const [selectedName,setSelectedName]=useState(null)
   const [selectedNameDetail,setSelectedNameDetail]=useState(null)

   useEffect(()=>{
    if(selectedName){ 
        fetch(`/${selectedName}.json`)
        .then((res)=>res.json())
        .then((data)=>setSelectedNameDetail(data))
    }
   },[selectedName])
   
  return (
    <div> 
        {
            names && names.map((name,index)=><button  key={index} onClick={()=>setSelectedName(name)}>{name}</button> )
        }
        <div>selectedName:{selectedName}</div>
        <div>selectedNameDetail:{JSON.stringify(selectedNameDetail)}</div>
        
    </div>
  )
}

export default UseEffect
````

The above code could be written like this also 
````javascript
import React, { useEffect, useState } from 'react'

function UseEffect() {
    const [names,setNames]=useState([])

    console.log(names)
   useEffect(()=>{
    fetch("/names.json")
    .then((res)=>res.json())
    .then((data)=>setNames(data))
   },[])
 
   const [selectedNameDetail,setSelectedNameDetail]=useState(null)

   const onSelectNameChange=(name)=>{
    if(name){ 
        fetch(`/${name}.json`)
        .then((res)=>res.json())
        .then((data)=>setSelectedNameDetail(data))
    }
   }
    
  return (
    <div> 
        {
            names && names.map((name,index)=><button  key={index} onClick={()=>onSelectNameChange(name)}>{name}</button> )
        } 
        <div>selectedNameDetail:{JSON.stringify(selectedNameDetail)}</div>
        
    </div>
  )
}

export default UseEffect
````

You don't need here useEffect You just need to do it when  user interact with you.

The best way to use useEffect is to use it as much as less possible 


lets create a stopwatch component that will return you time
Thi below code will run for infinite number if time and this  component will be rendered infinite number of times. 
````javascript
 const StopWatch=()=>{
    const [time,setTime]=useState(0) 
    setTimeout(()=>{
        setTime(time+1)
    },1000)

    return time 
   }
    
````

To save it from them we can use useEffect like this
````javascript
 const StopWatch=()=>{
    const [time,setTime]=useState(0)  
    useEffect(()=>{
        setTimeout(()=>{
            setTime(time+1)
        },1000) 
    },[])

    return time 
   }
   ````

   But our purpose is not solver here because for the first time when this stopwatch component was called at that time the function that is inside the useEffect will created a closure and the value of time in it will always be zero so after each second when the setTimeout function will  run then the value of time will always be there zero so it will always makes the value to 1 and not more than that to solve this we can use the time in  dependencies array so that whenever the times changes then this function get re-render again and then it fetches a new value and due to that we create a new closure and we get a new value of time but it takes us to the 1st problem again that is of infinite renders .
   One method to solve this problem is that we gave a new value to setter function each time using a function , so we will pass a function to the setter function that will returns you a new value each time 

   ````javascript
   const StopWatch = () => {
    const [time, setTime] = useState(0);
    useEffect(() => {
      setInterval(() => {
        setTime((t) => {
        console.log(t) 
          return t + 1;
        });
      }, 1000);
    }, []);

  ````

  function that you gives to the useEffect can return an function that gives you a cleaning function and that cleanup function is called whenever that old useEffect is getting unmounted and the new useEffect is coming in . Here will will clear the interval that we created 

````javascript
const StopWatch = () => {
    const [time, setTime] = useState(0);
    useEffect(() => {
      const intervalId=setInterval(() => {
        setTime((t) => {
        console.log(t) 
          return t + 1;
        });
      }, 1000);
      return ()=>clearInterval(intervalId)// this will be called when your useEffect is unmounting 
    }, []);

    return time;
  };
  ````



  # useRef

  A way to associate a state with a component, interesting thing with the useRef is that when you change  the value of reference it does not actually re-renders your component.
  
  Where to use useRef:
  1. to get the reference of an HTML element

````javascript
  import {useEffect, useRef} from 'react'

function UseRef() {
    const inputRef=useRef(null)
 
    useEffect(()=>{

        // inputRef.focus() // inputRef is an pointer to the input and not actually  input while inputRef.current is that input 

        // we are setting focus in thr useEffect because of while referring to an HTML element HTML element should be there it will be possible after the component is rendered 

        inputRef.current.focus()
        
    },[])
    
  return (
    <div> 
        <input type="text" ref={inputRef} />
    </div>
  )
}

export default UseRef
```` 


Second use of useRef:
1. To maintain the state without doing any update 
The below code is not used much but you should have an idea that there is something like that also exist 

````javascript
import {useEffect, useRef,useState} from 'react'

function UseRef() {
    const inputRef=useRef(null)
 
    useEffect(()=>{

        // inputRef.focus() // inputRef is an pointer to the input and not actually  input while inputRef.current is that input 

        // we are setting focus in thr useEffect because of while referring to an HTML element HTML element should be there it will be possible after the component is rendered 

        inputRef.current.focus()
        
    },[])


  const idRef=useRef(1)  
  const [names,setNames]=useState([
    { id:idRef.current++,name:"John"},
    { id:idRef.current++,name:"Jane"}
  ])
  const addName=()=>{
    setNames([...names,{
        id:idRef.current++,
        name:inputRef.current.value}])
    inputRef.current.value=""
  }

  return (
    <div> 
        <input type="text" ref={inputRef} />
        {names.map((name)=><div>{name.id}-{name.name}</div>)}
        <button onClick={addName}>Add names</button>
    </div>
  )
}

 export default UseRef
 ````