import { useState } from 'react'

function useVisibility(initialState:boolean) {

    const [isVisible,setVisibility] = useState(initialState)

    const toggle = () => {
        setVisibility(!isVisible)
    }

    const open = () => {
        setVisibility(true)
    }

    const close = () => {
        setVisibility(false)
    }





  return {
    toggle,
    close,
    open,
    isVisible,
  }
}

export default useVisibility