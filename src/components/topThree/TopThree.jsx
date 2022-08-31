import React from 'react'

const TopThree = () => {
    const top = [1,2,3]
  return (
    <div className='top-three'>
        12명과 함께 하고 있습니다.
        <div className='top-container'>
            동물의 왕
            {top.map((items,index)=>{
                return(
                    <div className='items'>
                        {items}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default TopThree