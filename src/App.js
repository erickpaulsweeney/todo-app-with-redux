import { useState } from "react";

function App() {
  let [count, setCount] = useState(0);
  return (
    <div className="app">
      <button onClick={() => setCount(count - 1)} className="action">-</button>
        {count}
      <button onClick={() => setCount(count + 1)} className="action">+</button>
    </div>
  );
}

export default App;
