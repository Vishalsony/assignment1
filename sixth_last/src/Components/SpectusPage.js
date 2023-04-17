import React from 'react'
import ReactPaginate from 'react-paginate';
import { useState } from 'react'
import { useEffect } from 'react'
import { format } from 'date-fns'

const SpectusPage = () => {
  const [de,setDe] = useState([])
  const[isLoading,setIsLoading]=useState(false)
  const[num,setNum]=useState(0)
   
  
    
  useEffect(() => {
    
      setIsLoading(true)
       const fetchData = () => fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${num}`).then((res) => {
        
        return res.json();
      }).then(({ hits }) => {
        
          setDe(hits)
          setNum(num + 1)
        
      }).catch((err) => {
        console.log(err.message)
      })

      const timer = setTimeout(() => {
        setIsLoading(false)
        setNum(num+1)
        
        fetchData();
        
      },10000);    
    },[num]) 

        
  return (
    <div>
    <table className='table bg-dark'>
    <thead>
        <tr className='mb-5 text-success text-danger'>
            <td><b>Title</b></td>
            <td><b>Author</b></td>
            <td><b>Created_AT</b></td>
                      
        </tr>
        </thead>
        <tbody>
        {!isLoading && <p className='text-light'>Loading</p>}
        {
            de.map((item)=>(
                <tr className='text-light'>
                
                    <th scope='row'>{item.title}</th>
                    <th scope='row'>{item.author}</th>
                    <th scope='row'>{format(new Date(item.created_at),'dd/MMM/yyyy')}</th>   
                </tr> 
            ))
        }
        </tbody>
    </table>
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'next'}
      pageCount={10}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      forcePage={num}
      
      containerClassName={'pagination justify-content-center mt-5'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
      />
  </div>
    
   
  )
}

export default SpectusPage
