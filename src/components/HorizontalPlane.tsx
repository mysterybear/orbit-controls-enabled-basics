/**
 * This module renders an invisible horizontal plane that records where the mouse
 * cursor is on a horizontal plane. This position is broadcast to the parent where it
 * can be stored, usually in a ref to keep performance in check.
 */
import React from "react"
import * as three from "three"

// Make sure this value is always larger than the model bounds
const planeSize = 5000

const plane: three.BufferGeometry = new three.PlaneBufferGeometry(
  planeSize,
  planeSize,
  1,
  1
)

const planeMaterial: three.Material = new three.MeshBasicMaterial({
  color: 0x248f24,
  alphaTest: 0,
  visible: false,
})

const HorizontalPlane = (props: {
  onChange: (pos: [number, number]) => void
}) => {
  return (
    <mesh
      geometry={plane}
      rotation={[-Math.PI / 2, 0, 0]}
      material={planeMaterial}
      onPointerMove={({ uv }) => {
        uv &&
          props.onChange([
            uv.x * planeSize - planeSize / 2,
            uv.y * planeSize - planeSize / 2,
          ])
      }}
    />
  )
}

export default HorizontalPlane
