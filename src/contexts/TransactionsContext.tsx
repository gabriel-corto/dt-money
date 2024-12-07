import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionsType {
  id: string 
  description: string 
  category: string 
  type: "income" | "outcome"
  price: number 
  createdAt: Date
}

interface TransactionsContextProps {
  transactions: TransactionsType[]
}

interface TransactionsContextProviderProps {
  children: ReactNode
}
export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function fetchTransactions() {
    const APIResponse = await fetch("http://localhost:3000/transactions")
    const TransactionsData = await APIResponse.json()

    setTransactions(TransactionsData)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}