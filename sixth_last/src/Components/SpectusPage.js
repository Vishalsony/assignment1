import React from 'react'
import ReactPaginate from 'react-paginate';
import { useState } from 'react'
import { useEffect } from 'react'
import { format } from 'date-fns'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

    // {!isLoading && <p className='text-light'>Loading</p>} 
        
  return (
    <div>
    
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
