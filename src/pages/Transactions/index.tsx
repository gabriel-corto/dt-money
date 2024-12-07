import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./style";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Transactions() {

  const { transactions } = useContext(TransactionsContext)

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