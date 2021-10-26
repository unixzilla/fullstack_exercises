import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }
  const filterString = props.filter
  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterString}/>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {filter: state.filter}
}
const mapDispatchToProps = {
filterChange
}
const ConnectedFilter = connect(mapStateToProps,mapDispatchToProps)(Filter)
export default ConnectedFilter
