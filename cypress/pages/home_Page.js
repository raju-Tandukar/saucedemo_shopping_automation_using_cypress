export const shoppingBtn=(productName)=>`.inventory_item_description:Contains(${productName}) .btn_inventory`
export const productNameInList=(productName)=>`.inventory_item_name:Contains(${productName})`
export const itemNameCss = '.inventory_item_name'

export const addProductToCart=(productName)=>{
    cy.get(shoppingBtn(productName),{timeout:5500}).click({force:true})
    cy.log('Verify once "Add to cart" button is clicked it changed to "Remove" button')
    cy.get(shoppingBtn(productName)).should('have.text','Remove')
}

export const addListOfProductToList=(productList)=>{
    let productArray = productList.split(',')
    productArray.forEach(function (item, index) {
        cy.log("Adding '" + item + " to the cart.")
        addProductToCart(item)
      });

    cy.log('Verify total ' + productArray.length + ' items are added in the shopping cart.')
    cy.get(".shopping_cart_badge").should("have.text", productArray.length)
}

export const verifySortingFeature=(filterType)=>{
    cy.get('[data-test=product_sort_container]').select(filterType)
    cy.wait(3000)
    if(filterType="Price (low to high)"){
        cy.get('.inventory_item_price')
        .then(($prices) =>
            Cypress._.map($prices, (el) => el.innerText),
        )
        .then((list) => list.map((text) => text.split(' ')[0]))
        .then((list) => list.map((str) => str.replace(/[^0-9.]/g, '')))
        .then((list) => list.map(parseFloat))
        .then((list) => {
            const sorted = Cypress._.sortBy(list)
            cy.log("Verify Price list are sorted from low to high order.")
            expect(sorted).to.deep.equal(list)
        })
    }
}

export const checkOut=(productList, firstName, lastName, zipCode)=>{
    cy.get('.shopping_cart_link', {timeout:5000}).click()
    cy.log("Verify all the product are correctly added and listed in Cart.")
    let productArray = productList.split(',')
    cy.log("Verify product count in cart is: " + productArray.length)
    cy.get(itemNameCss).should('have.length', productArray.length)
    productArray.forEach(function (item, index) {
        cy.log("Verify '" + item + " is added to cart")
        cy.get(productNameInList(item)).should("be.visible")
    });
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]', {timeout:5000}).type(firstName)
    cy.get('[data-test="lastName"]', {timeout:5000}).type(lastName)
    cy.get('[data-test="postalCode"]', {timeout:5000}).type(zipCode)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-text').should('have.text',"Your order has been dispatched, and will arrive just as fast as the pony can get there!")
}