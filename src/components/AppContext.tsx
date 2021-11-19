import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react"
import { createCtx } from "./utils"

type AppState = {
  orbitControlsEnabled: boolean
  horizontalPointer: MutableRefObject<[number, number]>
  set: Dispatch<SetStateAction<Omit<AppState, "set">>>
}

const [useCtx, CtxProvider] = createCtx<AppState>()

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const horizontalPointer = useRef<[number, number]>([0, 0])

  const [state, set] = useState({
    horizontalPointer,
    orbitControlsEnabled: true,
  })

  return <CtxProvider value={{ ...state, set }}>{children}</CtxProvider>
}

export const useApp = useCtx
