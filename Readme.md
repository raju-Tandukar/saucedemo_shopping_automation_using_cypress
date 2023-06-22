The test case is given in "Cypress Automation Home Exam.pdf" file. 


Note:
 After Git clone execute below command to download package and dependencies
    > npm install

Cypress commands


1. Cypress run through terminal
  > npx cypress run

2. debug mode
    > DEBUG=cypress:* npx cypress open

3. Run by filename
    > npx cypress run --spec "cypress/e2e/loginTest.cy.js"

4. run with system usage log
    >  DEBUG=cypress:server:util:process_profiler ./node_modules/cypress/bin/cypress open
