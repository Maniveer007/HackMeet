import React from 'react'

const NFTcard = ({props,idx}) => {
    // console.log(props);
    // console.log(idx);
  return (
    <div><a href={`/NFT/${idx}`}>
      NFTcard
      </a></div>
  )
}

export default NFTcard