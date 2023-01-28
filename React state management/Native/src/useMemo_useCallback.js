// import {useState,useMemo} from 'react'

// function UseMemo_useCallback() {
//     const[array,setArray]=useState([10, 20, 30])

//     // const total=array.reduce((acc,curr)=>acc+curr,0)

//     const total=useMemo(()=>array.reduce((acc,curr)=>acc+curr,0),
//     [array])

//     const [namesList]=useState(["Robin", "Sunil", "Rohit", "Aditya"])

//     // const sortedList=namesList.sort() // will mutate the array and will return you the reference of the array but content of the array will be mutated 

//     // const sortedList=[...namesList].sort()   

//     const sortedList=useMemo(()=>[...namesList].sort(),[namesList]) 
//     //as the nameList will change we wan to run this sort again 
//   return (
//     <>
//     <div>total:{total}</div>
//     <div>namesList:{namesList}</div>
//     <div>sortedList:{sortedList}</div>
//     </>
//   )

// }

// export default UseMemo_useCallback



// use callback 

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