import React from 'react'
import { Link } from 'react-router-dom'
import Homein from './Homein'



function Hometwo({datas}) {
  return (
    <div>
      <div className='griditem'
      style={{
        
          display: 'grid',
          gridTemplateColumns:'1fr 1fr'  ,
          rowGap:'50px',
          marginLeft:'300px',
          marginTop:'60px'
        
        
      }}
      >
          {datas.map((item) => (
            <Homein item={item} key={item._id}/>
            
          ))}
        </div>
    </div>
  )
}

export default Hometwo