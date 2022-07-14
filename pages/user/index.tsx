import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import Header from '../../components/Header';


const Page: NextPage = () => {

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
      <Header />
      <p>{JSON.stringify(data)}</p>
    </>
  )
}

export default Page;
