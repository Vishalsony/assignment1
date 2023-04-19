import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Created_At &nbsp;</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {de.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{format(new Date(row.created_at),'dd/MMM/yyyy')}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

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
