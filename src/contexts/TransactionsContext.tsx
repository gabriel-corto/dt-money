import { ReactNode, useCallback, useEffect, useState } from "react"
import { api } from "../libs/axios"
import { createContext } from "use-context-selector"

interface TransactionsType {
  id: string
  description: string
  category: string
  type: "income" | "outcome"
  price: number
  createdAt: Date
}

interface CreateTransactionInputs {
  description: string
  category: string
  price: number
  type: "income" | "outcome"
}

interface TransactionsContextProps {
  transactions: TransactionsType[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInputs) => Promise<void>
}

interface TransactionsContextProviderProps {
  children: ReactNode
}
export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const APIResponse = await api.get("transactions", {
      params: {
        q: query,
      },
    })
    const TransactionsData = await APIResponse.data
    console.log(query)

    setTransactions(TransactionsData)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInputs) => {
      const { description, price, category, type } = data

      const APIResponse = await api.post("transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })
      const transactionsData = APIResponse.data

      setTransactions((state) => [transactionsData, ...state])
    },
    []
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
