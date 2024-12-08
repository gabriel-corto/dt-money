import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../libs/axios";

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

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function fetchTransactions(query?: string) {    
    const APIResponse = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query
      }
    })
    const TransactionsData = await APIResponse.data

    setTransactions(TransactionsData)
  }

  async function createTransaction(data: CreateTransactionInputs) {
    const { description, price, category, type } = data

    const APIResponse = await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date()
    }) 
    const transactionsData = APIResponse.data

    setTransactions(state => [transactionsData, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider 
    value={{ 
      transactions, 
      fetchTransactions, 
      createTransaction 
    }}>

      {children}
    </TransactionsContext.Provider>
  )
}