import React from 'react'
import { useRecoilState } from 'recoil'
import { modelState } from '../atom/atomModel'
export default function Component() {
    const[open,setOpen]=useRecoilState(modelState)
  return (
    <>
    <div>Component</div>
    {open&& (
        <h1>the model is open state</h1>
    )}
    </>
  )
}
