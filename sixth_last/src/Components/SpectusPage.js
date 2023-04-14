import React from 'react'
import MaterialReactTable from 'material-react-table'
import ReactPaginate from 'react-paginate';
import { useState } from 'react'
import { useEffect } from 'react'

const SpectusPage = () => {
  const [de,setDe] = useState([])
  // onPageChange={handlePageClick}
  const[num,setNum]=useState(0)
   
    
  useEffect(() => {
    
    
       const fetchData = () => fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${num}`).then((res) => {
        
        return res.json();
      }).then(({ hits }) => {
        
          setDe(hits)
          setNum(num + 1)
        // console.log(hits)
        
      }).catch((err) => {
        console.log(err.message)
      })

      const timer = setTimeout(() => {
        setNum(num+1)
        fetchData();
      },10000);
      // return () => clearTimeout(timer);

      
    },[num]) 

    useEffect(()=>{

    })
        
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
        {
            de.map((item)=>(
                // console.log(item,"item")
                <tr className='text-light'>
                    
                    <th scope='row'>{item.title}</th>
                    <th scope='row'>{item.author}</th>
                    <th scope='row'>{item.created_at}</th>   
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
