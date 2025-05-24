import React from 'react'

type Props = {}

const Button = ({ text }) => {
  return (
    <div
    className="pt-2 pb-2 pl-8 pr-8 rounded-full border border-white/20 bg-white bg-opacity-10 text-white transition-colors cursor-pointer hover:bg-white hover:text-black hover:border-white"
    >
    {text}
    </div>

  )
}

export default Button;