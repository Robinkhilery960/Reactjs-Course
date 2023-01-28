import React, { useEffect, useState } from "react";

function UseEffect() {
  const [names, setNames] = useState([]);

  console.log(names);
  useEffect(() => {
    fetch("/names.json")
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, []);

  const [selectedNameDetail, setSelectedNameDetail] = useState(null);

  const onSelectNameChange = (name) => {
    if (name) {
      fetch(`/${name}.json`)
        .then((res) => res.json())
        .then((data) => setSelectedNameDetail(data));
    }
  };

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

  return (
    <div>
      {names &&
        names.map((name, index) => (
          <button key={index} onClick={() => onSelectNameChange(name)}>
            {name}
          </button>
        ))}
      <div>selectedNameDetail:{JSON.stringify(selectedNameDetail)}</div>
      <div>
        Timer:
        <StopWatch />
      </div>
    </div>
  );
}

export default UseEffect;
