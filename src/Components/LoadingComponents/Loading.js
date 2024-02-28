import React from 'react'
import './Loading.css'
function Loading() {
  return (
    <div class="loader" style={{height:'50vh'}}>
  <div class="wrapper">
    <div class="circle"></div>
    <div class="line-1"></div>
    <div class="line-2"></div>
    <div class="line-3"></div>
    <div class="line-4"></div>
  </div>
</div>
  )
}

export default Loading
