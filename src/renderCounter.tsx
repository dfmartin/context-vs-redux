import React from 'react'

export const RenderCounter = (props: { name: string }) => {
  const count = React.useRef(0)

  React.useEffect(() => {
    count.current++
  })

  console.log(`*** render ${props.name}: ${count.current}`)
  return null
}

export const useRenderCount = (name: string) => {
  const count = React.useRef(1)

  React.useEffect(() => {
    count.current++
  })

  console.log(`*** render ${name}: ${count.current}`)
  return count.current
}
