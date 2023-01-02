import React from 'react'
import spinner from './Spinner.gif';
const Loader = () => {
  return (
    <img src={spinner} alt='loading...' style={{maxWidth:'200px',margin:'auto'}}></img>
  )
}

export default Loader