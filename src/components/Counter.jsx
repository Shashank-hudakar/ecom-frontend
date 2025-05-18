import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount( count + 1);};
  const decrement = () => {
   setCount( count - 1);};
console.log("counter component rendered")

  return (
    <div>
      <h1 style={{color:'chocolate'}}>Counter PAGE </h1>
        <p>Count : {count}</p>
      <button style={{backgroundColor:"chocolate",color:"aquamarine"}} onClick={increment}>Increment</button>
      <button style={{backgroundColor:"chocolate",color:"aquamarine"}}onClick={decrement}>Decrement</button>
     
    </div>
  );
};

export default Counter;
