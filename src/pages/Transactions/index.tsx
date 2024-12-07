import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./style";

interface TransactionsType {
  id: string 
  description: string 
  category: string 
  type: "income" | "outcome"
  price: number 
  createdAt: Date
}
export function Transactions() {

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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.price}
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}