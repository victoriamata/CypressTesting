describe('React Tech Quiz App', () => {
  beforeEach(() => {
      cy.visit('/'); // Navigate to the homepage before each test
  });

  it("should show a 'Begin Quiz' button on the landing page", () => {
      // Verifying that the 'Begin Quiz' button is visible on the page
      cy.get('button').contains('Begin Quiz').should('be.visible');
  });

  it("should display a question and four selectable answers after clicking 'Begin Quiz'", () => {
      // Click 'Begin Quiz' and ensure a question card with answer options appears
      cy.get('button').contains('Begin Quiz').click();
      cy.get('.question-card').should('be.visible');
      cy.get('button').contains('Option 1').should('be.visible');
      cy.get('button').contains('Option 2').should('be.visible');
      cy.get('button').contains('Option 3').should('be.visible');
      cy.get('button').contains('Option 4').should('be.visible');
  });

  it("should allow users to select an answer and proceed to the next question", () => {
      // Start quiz and ensure question options are visible
      cy.get('button').contains('Begin Quiz').click();
      cy.get('.question-card').should('be.visible');

      // Click on an answer option (Option 3 in this case)
      cy.get('button').contains('Option 3').click();

      // Ensure the next question card is displayed
      cy.get('.question-card').should('be.visible');
  });

  it("should navigate through questions and show next one after selecting an answer", () => {
      // Start quiz
      cy.get('button').contains('Begin Quiz').click();

      // Verify first question is visible
      cy.get('.question-card').should('be.visible');

      // Select one of the answers (Option 2)
      cy.get('button').contains('Option 2').click();

      // Verify next question is displayed
      cy.get('.question-card').should('be.visible');
  });

  it("should allow progression through 10 questions and show completion page", () => {
      // Begin quiz
      cy.get('button').contains('Begin Quiz').click();

      // Loop through 10 questions
      for (let q = 1; q <= 10; q++) {
          cy.get('.question-card').should('be.visible');
          cy.get('button').contains('Option 1').should('exist');
          cy.get('button').contains('Option 2').should('exist');
          cy.get('button').contains('Option 3').should('exist');
          cy.get('button').contains('Option 4').should('exist');

          // Select an answer (Option 4 in this case)
          cy.get('button').contains('Option 4').click();

          // After each question except the last, ensure the next question is displayed
          if (q < 10) {
              cy.get('.question-card').should('be.visible');
          } else {
              // At the 10th question, verify the quiz completion screen appears
              cy.get('.quiz-completion').should('be.visible');
              cy.get('button').contains('Retake Quiz').click(); // Button to retake the quiz
          }
      }
  });
});
