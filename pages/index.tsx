import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';


const Home: NextPage = () => {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3001/`)
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <h1>App</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}

export default Home
