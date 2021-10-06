import React,{ useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props,ref)=>{
  const [visible,setVisible] = useState(false)
  //style
  const hideWhenVisible = {display: visible?'none':''}
  const showWhenVisible = {display: visible?'':'none'}

  const toggleVisibility = () =>{
    setVisible(!visible)
  }
  //for App.js uses Ref hook
  useImperativeHandle(ref,()=>{
    return {
      toggleVisibility
    }
  })

  return (
    <div>
    <div className='show-button' style={hideWhenVisible}>
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>
    <div className='hide-button' style={showWhenVisible}>
    {props.children}
    <button onClick={toggleVisibility}>cancel</button>
    </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
