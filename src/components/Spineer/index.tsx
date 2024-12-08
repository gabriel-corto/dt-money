import { Spinner } from "phosphor-react";
import { SpineerContainer } from "./style";

export function Spineer() {
  return (
    <SpineerContainer>
      <Spinner weight="bold" size={34} />
      <span>Buscando Transações...</span>
    </SpineerContainer>
  )
}