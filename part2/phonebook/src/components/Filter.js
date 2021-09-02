import React from 'react'

const Filter = ({newSearch,setSearch}) => {
  return (
    <div>
        filter shown with<input value={newSearch} onChange={(event) => setSearch(event.target.value)} />
    </div>
  )
}

export default Filter