
/* 
USS STATE HOOK ----------------------------------------------------------------------------------------------------------------------------------------------------
*/


//  import {useState} from "react"
// function Count() {
//   const[count,setCount]=useState(10)
//   const onClick=(event)=>{
//     setCount(count+1)
//   }
//   return (
//     <div className="App">
//        <button onClick={onClick}>count:{count}</button>
//     </div>
//   );
// }
// function App() {

//   return (
//     <div className="App">
//       <Count/>
//       <Count/>
//       <Count/>
//       <Count/>
//       <Count/>
//     </div>
//   );
// }

// export default App;

// state value is an array

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
