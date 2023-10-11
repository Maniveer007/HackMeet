import React from 'react'

const SISMOcard = ({props,idx}) => {
    console.log(idx);
  return (
<>
    <div><a href={`/sismo/${idx}`}>SISMOcard</a></div>
</>
  )
}

export default SISMOcard