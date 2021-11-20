import { a, useSpring } from "@react-spring/three"
import { OrbitControls } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"
import { Fragment, PropsWithChildren } from "react"
import { AppProvider, useApp } from "./AppContext"
import HorizontalPlane from "./HorizontalPlane"

const Box = () => {
  const { horizontalPointer, set } = useApp()

  const [spring, setSpring] = useSpring(() => ({
    position: [0, 0, 0],
    immediate: true,
  }))

  const factor = useThree((three) => three.viewport.factor)

  const bind = useDrag(
    ({ first, last }) => {
      if (first) set((p) => ({ ...p, orbitControlsEnabled: false }))
      const [x, z] = horizontalPointer.current
      setSpring.start({ position: [x, 0, -z], immediate: true })
      if (last) set((p) => ({ ...p, orbitControlsEnabled: true }))
    },
    { transform: ([x, y]) => [-x / factor, y / factor] }
  )

  return (
    <a.mesh {...(spring as any)} {...(bind() as any)}>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="tomato" />
    </a.mesh>
  )
}

const AppSceneWrapper = ({ children }: PropsWithChildren<{}>) => {
  const { horizontalPointer, orbitControlsEnabled } = useApp()
  return (
    <Fragment>
      <HorizontalPlane
        onChange={([x, y]) => (horizontalPointer.current = [x, y])}
      />
      <OrbitControls enabled={orbitControlsEnabled} />
      {children}
    </Fragment>
  )
}

const App = () => (
  <Canvas camera={{ position: [10, 10, 10] }}>
    <AppProvider>
      <AppSceneWrapper>
        <Box />
      </AppSceneWrapper>
    </AppProvider>
  </Canvas>
)

export default App
