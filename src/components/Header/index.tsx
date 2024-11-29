import { HeaderContainer, HeaderContent } from "./style";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src="/assets/logo.png" />

        <button type="submit">Nova transação</button>
      </HeaderContent>
    </HeaderContainer>
  )
}