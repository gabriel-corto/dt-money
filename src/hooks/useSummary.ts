import { useMemo } from "react"
import { TransactionsContext } from "../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => context.transactions)

  const summary = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
    
      if(transaction.type === "income") {
        acc.income += transaction.price
        acc.total += transaction.price 
      } 
      else if(transaction.type === "outcome") {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }
  
      return acc 
    }, 
    {
      outcome: 0,
      income: 0,
      total: 0
    })
  }, [transactions])

  return summary
}