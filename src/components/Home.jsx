
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Home = () => {
const [data, setData] = useState([]);
console.log(data.data)
const feach = async () =>{
  const res = await axios.get("http://localhost:1337/api/home?populate=*");
  setData(res.data);
}
useEffect(() => {
  feach()
},[])

  return (
    <div>
      <h1>{data?.data?.attributes?.studentName.length}Student</h1>
     {data?.data?.attributes?.studentName?.map((person,id) =>
    (
      <div key={id}>
        
        {person?.student}
        {person?.age}
      </div>
    )
     )}
    </div>
  )
}

export default Home


