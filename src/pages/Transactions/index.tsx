import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./style";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de Sites</td>
              <td>
                <PriceHightLight variant="income">
                  AOA 12.000,00
                </PriceHightLight>
              </td>
              <td>Venda</td>
              <td>13/11/2024</td>
            </tr>

            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHightLight variant="outcome">
                  - AOA 12.000,00
                </PriceHightLight>
              </td>
              <td>Alimentação</td>
              <td>13/11/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}