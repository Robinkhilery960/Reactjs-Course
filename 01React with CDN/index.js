// using js we manipulated the dom 
// const root=document.getElementById("root")
// const heading=document.createElement("h1")
// heading.innerHTML="Hello Everyone"
// root.appendChild(heading)



// let see how to do that using react 

// const heading=React.createElement("h1",{
//     id:"title"
// },"Hello  Everyone. how are you ")
// console.log(heading)

// const root=ReactDOM.createRoot(document.getElementById("root"))

// root.render(heading) a

// div>h1+h2

const root=ReactDOM.createRoot(document.getElementById("root"))

const heading1=React.createElement("h1",{},"Heading1")
const heading2=React.createElement("h1",{},"Heading2")
const container=React.createElement("div",{id:"container"},[heading1,heading2])

root.render(container)

