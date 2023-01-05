import React from 'react'
import { useContext } from 'react';
import Header from '../../components/Header';
import { UserContext } from '../SkuScanner';
import './index.styles.css'
export default function SkuDetail({ store }) {
  console.log(store);
  console.log(store.map(res => {
    console.log(res);
  }))
  const counts = {};
  // const sampleArray = ['a', 'a', 'b', 'c'];
  store.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  console.log(counts)
  return (
    <div>
      <Header title="Sku Details"/>
      <div className='tableDiv'>
      <table class="table w-50">
        <thead>
          <tr>
            <th scope="col">SNo</th>
            <th scope="col">Sku</th>
            <th scope="col">Quantity</th>


          </tr>
        </thead>
        {Object.keys(counts).map((res, i) => (
          <tbody>
            <tr>
              <td>{i + 1}</td>
              <td>{res}</td>
              <td>{counts[res]}</td>
             
            </tr>
          </tbody>
        ))}

      </table>
      </div>
      
    </div>
  )
}
