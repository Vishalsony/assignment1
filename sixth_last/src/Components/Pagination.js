import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns'

const Pagination = () => {
    const [de,setDe] = useState([])
  
  const[num,setNum]=useState(0)
   
    
  const fetchData=async(num)=>{
    const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${num}`)
    const data = await res.json().then(({ hits }) => {
        
        setDe(hits)
        setNum(num + 1)

    }).catch((err) => {
      console.log(err.message)
    })
    return data
    
  }
   
      const handlePageClick = async(page)=>{
    
        let currentPage = page.selected + 1   
        const final =await fetchData(currentPage)
        setNum(final)
      }

      useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${num}`).then((res) => {
        
        return res.json();
      }).then(({ hits }) => {
        
          setDe(hits)
          setNum(num + 1)

      }).catch((err) => {
        console.log(err.message)
      })
      },[])
      
    
  return (
    <div>
    <div className='text-center'> 
    <h1 className='text-center mb-5'> Various Data Of API</h1>
    <table className='table bg-dark'>
    <thead>
        <tr className='mb-5 text-success text-danger'>
            <td><b>Title</b></td>
            <td><b>Author</b></td>
            <td><b>Created_At</b></td>
                       
        </tr>
        </thead>
        <tbody>
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
      onPageChange={handlePageClick}
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
    </div>
  )
}

export default Pagination
