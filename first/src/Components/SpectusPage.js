import React, { useEffect, useState } from 'react'

const SpectusPage = () => {
// const[data,setData]=useState({}) 
const [de,setDe] = useState([])
const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
      fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0").then((res) => {
        
        return res.json();
      }).then((resp) => {
        setIsLoading(false)
          setDe(resp)
        // console.log(hits)
      }).catch((err) => {
        console.log(err.message)
      })
    },[])    
    // console.log(de,"deggg");
  return (
    <div>
    {isLoading && <p>Loading...</p>}
        { !isLoading && JSON.stringify(de)}
    </div>
  )
}

export default SpectusPage
