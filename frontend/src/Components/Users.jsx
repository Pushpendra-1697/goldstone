import React, { useEffect, useState } from 'react';
import { backend_url } from '../BackendUrl';
import {Button} from '@chakra-ui/react'

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await fetch(`https://gorest.co.in/public-api/users`);
      res = await res.json();
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  };

  const handleClick = async () => {
    try {
      let res = await fetch(`${backend_url}/posts`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      res = await res.json();
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Button mt="3%" bg="black" color="white" onClick={handleClick}>Store DB</Button>
  );
}

export default Users;