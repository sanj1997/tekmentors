import AppContextProvider, { AppContext } from "../../src/Context/AppContext"
import {invoices} from "../../src/db.json"
import HomePage from "../../src/Pages/HomePage"
describe('TaxCalculator.cy.jsx', () => {

  beforeEach(()=>{
    cy.mount(
      <AppContextProvider>
       <HomePage/>
      </AppContextProvider>
    )
  })
  it("App renders correctly",()=>{
    cy.get('[data-cy="row"]').should("have.length",invoices.length)
  })
  it('Tax calculated correctly', () => {
     invoices.forEach((e,i)=>{
       let rate=e.item_type==0? 0.05 : e.item_type==1? 0.08 : e.item_type===2? 0.12 : null
       if(rate)
       {
          cy.get('[data-cy="row"]').eq(i).find("button").click().then(()=>{
                 cy.get('[data-cy="output"]').contains(e.amount*rate)
          })
       }
       else
       {
          cy.get('[data-cy="row"]').eq(i).find("button").click().then(()=>{
                 cy.get('[data-cy="output"]').contains("Invalid")
          })
       }
     })
  })
})