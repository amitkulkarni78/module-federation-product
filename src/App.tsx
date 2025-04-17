import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchProducts, RootState } from './productsStore';

function App() {
  const [count, setCount] = useState(0);
  const count1 = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <div className="">
      <header className="">
        <a>
          Hello from Remote App!
        </a>
       {/*  Count - { count1 }
        <button onClick={()=>{ setCount(count+1);}}> click me</button> */}
        <ul>
          {
            products.map((u: any) => {
              return <li>
                 { u.title}
              </li>
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
