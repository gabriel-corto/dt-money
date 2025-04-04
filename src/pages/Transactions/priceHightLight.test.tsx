import { describe, expect, it } from "vitest"
import { PriceHightLight } from "./style"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../../themes/default"

describe("PriceHightLight", () => {
  it("Should be render the right color whene transaction in income", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PriceHightLight variant='income'>+ AOA 30,000.00</PriceHightLight>
      </ThemeProvider>
    )
    const priceElement = screen.getByText("+ AOA 30,000.00")

    expect(priceElement).toBeInTheDocument()
    expect(priceElement).toHaveStyle({
      color: "rgb(0, 135, 95)",
    })
  })
  it("Shout be render the right color whwne transaction in outcome", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PriceHightLight variant='outcome'>- AOA 30,000.00</PriceHightLight>
      </ThemeProvider>
    )
    const priceElement = screen.getByText("- AOA 30,000.00")

    expect(priceElement).toBeInTheDocument()
    expect(priceElement).toHaveStyle({
      color: "rgb(247, 90, 104)",
    })
  })
})
