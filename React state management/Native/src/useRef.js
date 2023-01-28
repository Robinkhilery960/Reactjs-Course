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