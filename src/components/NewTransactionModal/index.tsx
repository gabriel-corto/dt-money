import * as Dialog from "@radix-ui/react-dialog"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./style"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import * as zod from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { TransactionsContext } from "../../contexts/TransactionsContext"

const NewTransactionFormScheme = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"])
})

type NewTransactionFormInputs = zod.infer<typeof NewTransactionFormScheme>

export function NewTransactionModal() {

  const { createTransaction } = useContext(TransactionsContext)

  const { control, register, handleSubmit, formState: { isSubmitting }, reset} = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormScheme),
    defaultValues: {
      type: "outcome"
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const newTransaction: NewTransactionFormInputs = {
      description: data.description,
      price: data.price,
      category: data.category,
      type: data.type
    }

    await createTransaction(newTransaction)

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text" 
            placeholder="Descrição"
            {...register("description")} 
          />
          <input
            type="number" 
            placeholder="Preço"
            {...register("price", { valueAsNumber: true })} 
          />
          <input
            type="text" 
            placeholder="Categoria"
            {...register("category")} 
          />

          <Controller 
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processando Pedido..." : "Cadastrar"}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}