import { NewTransactionModal } from "../NewTransactionModal"
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style"
import * as Dialog from "@radix-ui/react-dialog"

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src='/assets/logo.png' />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton type='submit'>
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
