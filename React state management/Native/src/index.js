import React from 'react';
import ReactDOM from 'react-dom/client'; 
// import UseState from './useState.js'; 
// import UseReducer from './useReducer.js'; 
// import UseMemo_useCallback from './useMemo_useCallback.js';
// import UseEffect from './useEffect.js';
import UseRef from './useRef.js';
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <UseState/> */}
    {/* <UseReducer /> */}
    {/* <UseMemo_useCallback /> */}
    {/* <UseEffect /> */}
    <UseRef />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals 
