import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TabelProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create an async function to fetch data
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/productlist');
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    // Call the async function
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center p-3 m-3">Daftar Barang</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table border-dark table-striped table-hover table-bordered w-auto border">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.Id}>
                    <td>{product.Id}</td>
                    <td>{product.Name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TabelProduct;
