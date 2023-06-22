
import * as  home_Page from '../pages/home_Page'
const testData = require('../fixtures/loginUserTest.json');
describe('User base Test scenarios', function(){

    beforeEach( () => {
        cy.visit(Cypress.env('baseURL'))
    });

    testData.forEach(data => {
        it(data.testScenario, { retries: 1 }, function(){
            if(data.validCredential=="true"){
                cy.login(data.userName, data.password)
                home_Page.addListOfProductToList(data.shoppingList)
                home_Page.verifySortingFeature(data.productFilterType)
                home_Page.checkOut(data.shoppingList, data.firstName, data.lastName, data.zipCode)
            }else{
                cy.login(data.userName, data.password, false, data.logintFailureMsg) 
            }
        });
    });
});