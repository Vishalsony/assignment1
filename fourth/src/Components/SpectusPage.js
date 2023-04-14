import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

const SpectusPage = () => {
    const [de,setDe] = useState([])

  useEffect(() => {
    
      fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0").then((res) => {
        
        return res.json();
      }).then(({ hits }) => {
        
          setDe(hits)
        // console.log(hits)
      }).catch((err) => {
        console.log(err.message)
      })
    },[]) 
  return (
    <div>
    <h1 className='text-center'>Display Selected Data's from API</h1>
    <table>
        <tr className='mb-5'>
            <td>Title</td>
            <td>Author</td>
            <td>created_at</td>
                       
        </tr>
        {
            de.slice(0,10).map((item)=>(
                // console.log(item,"item")
                <tr>
                    <td>{item.title}  </td>
                    <td>{item.author}</td>
                    <td>{format(new Date(item.created_at),'dd/MMM/yyyy')}</td>
                      
                </tr> 
            ))
        }
    </table>
    </div>
  )
}

export default SpectusPage
