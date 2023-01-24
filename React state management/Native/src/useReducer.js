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
