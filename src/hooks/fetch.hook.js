// useFetch.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

axios.defaults.baseURL = "http://localhost:2020";


/** Custom hook */
export default function useFetch() {
  const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })
  // Inside your fetchData function in useFetch.js
  let token = localStorage.getItem('token')

  const fetchData = async () => {
    try {
      setData(prev => ({...prev, isLoading: true}));
      const headers = {
        Authorization: `Bearer ${token}`, // Add "Bearer" prefix
      };
      const {data, status} = await axios.get('http://localhost:2020/api/shareHolders/dashBoard', { headers });
  
      if (status === 200) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          apiData: data,
          status: status,
        }));
  
        // Log the updated state after the setData callback
        console.log("token Api", {
          ...getData,
          apiData: data,
          status: status,
        });
      }
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        serverError: error,
      }));
    }
  };
  
  fetchData()
  
  

  return [getData, setData];
}
