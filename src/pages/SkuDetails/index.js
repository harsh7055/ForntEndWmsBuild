import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../Menu';
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
      <table class="table">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Name</th>
            <th scope="col">No of products</th>
            <th scope="col">Warehouse</th>
            <th scope="col">Owner</th>
            <th scope="col">User</th>


          </tr>
        </thead>
        {Object.keys(counts).map((res, i) => (
          <tbody>
            <tr>
              <td>{i + 1}</td>
              <td>{res}</td>
              <td>{counts[res]}</td>
              <td>{localStorage.getItem('warehouse')}</td>
              <td>{localStorage.getItem('owner')}</td>
              <td>{localStorage.getItem('UserName')}</td>
            </tr>
          </tbody>
        ))}

      </table>
    </div>
  )
}
