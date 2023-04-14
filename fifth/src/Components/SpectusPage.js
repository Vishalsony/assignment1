import React from 'react'
import MaterialReactTable from 'material-react-table'
import { useState } from 'react'
import { useEffect } from 'react'
function SpectusPage() {
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

        const columns =[
            {accessorKey:"title",header:"Title"},
            {accessorKey:"author",header:"Author"},
            {accessorKey:"created_at",header:"Created_At"}
        ]
  return (
    <div>
      <MaterialReactTable
      data={de}
      columns={columns}
      options={{pageSize:20,pageSizeOptions:[20]}}
      />
    </div>
  )
}

export default SpectusPage
