# React with CDN:
React is actually an js code written by the Facebook developer that is given to you to perform some operations  when you  uses react in your app using cdn then cdn inject the code that you saw on url in cdn link  to your app , we also get some utility function like React.createElement and React.createContext 

React is a global object and you can  use anywhere in your app to this .

## What is cdn?
  CDN is a group of geographically located server that speed up delivery of your web content  by  bringing it close to the user 


the first script is the core of the react while the second version of the react is to give react access of the DOM 

## How to create the elements in the react :
 React gives you an api called as `React.createElement() `with the help of that you can easily create your elements  

**React.createElement:**

`React.createElement(
  type,
  [props],
  [...children]
)`

`first argument`- is the tag tat you want to create 

`second argument`- an object 

`third argument` is what you need to put inside your tag 

Creates a react new react element and return this newly created element also , the new created element type will be the one you specified while using this function 
type argument can be :
1. tag name in string
2. react component - class or function 
3. react fragment  

Code written with JSX will be converted to use React.createElement(). You will not typically invoke React.createElement() directly if you are using JSX


Now you want to run you react code inside your app then you  have to tell the   react that in side your app where you wan to run your react code , for example let say that you wan to run your react app inside your div which have an id as root so how you can do that ? So for this reactDOM gives you an api called as ReactDOM.createRoot() that tells the react that what is the root element in my app. We are using reactDOM here because  we are dealing with DOM here, I want to modify my DOM , I am reading something from the DOM  
const root=ReactDOM.createRoot(document.getElementById("root"))

**Now how to put your heading in your root** : 

root.render(heading)- when you provide an react element to the render function of the newly created root then it injects that in DOM and modify DOM by doing so . If there is already something inside the react root then it will be overwritten  and this is happening because we have declared div with the  id as root to our react root 

generally we write like this <div id=”root”>Not rendered yet</div>- just to find if there is any error in rendering, root is not configured properly 

React.createElement : return you your newly created element  and  and that element is actually an object with the keys like type , props, ref etc 
react element is not a jsx it is an object  , it is a plain js object with provided type 
So finally what happens is that you have a code provided to you by react and you passes some arguments to it and then these arguments are taken by the pre written code and as output it gives you your plain js object 

With the help of the object in the react.createElement api 2nd argument that object can used to add attributes to your element you created in react and the element object will get also updated with it , inside of the objects prop key your attribute will be added

when you will refer your page very fast then you can see easily` not rendered` for some milliseconds because when you refreshes our page  then to load the react into your page it takes some time -if you open you network in devtool you can see that how much time these scripts took to load and when you reaches to the react.render line at that time injection will happen 



## script  element: 
this element include the global attributes.
Q. What are global attributes? 
Global attributes are those attributes those can be used to every element it may be possible that some of the elements may not show any effect after using them 
Q. Classic scripts vs. module scripts in JavaScript?

1.**difference between async and defer** :

    Normal script- will block the parsing of the code as soon as your browser will encounter the  script tag and then it will load that script nad then it will execute that script and then html parsing will start again 
    Async script- as soon as your browser will encounter your async script  then it will keep parsing the html but along with that it will also fetch the script parallel and as soon as this fetch get completed then you script will start executing this execution can also happen before the completion of  your html parsing  and can also be happen after your html parsing , thus all depends upon the how much time does your js takes to load . 
2. crossorigin:
  this attribute provides support for CORS
     valid on: audio,img,link,script and video elements 
     
3. What is CORE?
 It is a HTTP header based mechanism that permits you on loading resources from different origins

CORS: cross origin resources sharing - a mechanism that uses the http headers to tell the browser  that if two application with different origin can  share resources or not with each other . If they have same origin sharing can be done easily , otherwise they need to follow CORS .
When origin A  makes a call to the origin B at that time initially a preflight call is made also called as options call and then it receives at the end B and  now B has thr responsibility to check that if resources sharing is possible or not and then this B will send you the additional header and upn looking at those additional header origin A will send the actual call. 

Additional HTTP headers- Access-control-Allow-Origin: can have different value , 
*- any domain can access it. 
robinKhilery.com- call can be made from this origin 

Does all the request made from A to B follow this method-NO, not all the request  call the preflight . 




When you uses react with the help of cdn the at that time you get the React as a global object that can be accessed from anywhere in your app