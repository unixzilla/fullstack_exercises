import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }
  const style = {
    marginBottom: 10
  }
  const filterString = useSelector( state => state.filter )
  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterString}/>
    </div>
  )
}

export default Filter
