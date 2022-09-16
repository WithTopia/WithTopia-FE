import React from 'react'

const DividRecord = ({subscribers}) => {
    console.log(subscribers)
  return (
    <div className='dividrecord'>
        {subscribers === null || undefined ? null :
        <div>
            
        </div>}
    </div>
  )
}

export default DividRecord