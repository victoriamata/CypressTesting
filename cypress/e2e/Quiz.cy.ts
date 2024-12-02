describe('React Tech Quiz Website', () => {
    beforeEach(() => {
        // Navigate to the home page before each test
        cy.visit('/');
    });

    it('should show the "Start Quiz" button on the landing page', () => {
        // Verify that the Start Quiz button is visible
        cy.get('button').contains('Start Quiz').should('be.visible');
    });

    it('should display a question card and options after starting the quiz', () => {
        // Click the Start Quiz button
        cy.contains('Start Quiz').click();

        // Ensure a question card is displayed
        cy.get('.card').should('be.visible');

        // Verify that there are multiple choice options
        cy.get('button').filter(':contains("1"), :contains("2"), :contains("3"), :contains("4")').should('have.length', 4);
    });

    it('should allow selecting from the multiple-choice options', () => {
        // Start the quiz
        cy.contains('Start Quiz').click();

        // Confirm the presence of a question card
        cy.get('.card').should('be.visible');

        // Verify that all answer options are present
        const options = ['1', '2', '3', '4'];
        options.forEach((option) => {
            cy.contains('button', option).should('exist');
        });

        // Simulate selecting an answer
        cy.contains('button', '2').click();
    });

    it('should navigate to the next question after an answer is selected', () => {
        // Start the quiz
        cy.contains('Start Quiz').click();

        // Select an answer and confirm the next question appears
        cy.contains('button', '3').click();

        // Verify the question card is still visible (indicating a new question has loaded)
        cy.get('.card').should('be.visible');
    });

    it('should cycle through all 10 questions and display the completion page', () => {
        // Start the quiz
        cy.contains('Start Quiz').click();

        // Iterate through 10 questions
        for (let questionNumber = 1; questionNumber <= 10; questionNumber++) {
            // Verify the question card is visible
            cy.get('.card').should('be.visible');

            // Check that all four options are displayed
            ['1', '2', '3', '4'].forEach((option) => {
                cy.contains('button', option).should('exist');
            });

            // Select an answer (using option "4" for consistency)
            cy.contains('button', '4').click();

            // Check if it's the last question
            if (questionNumber === 10) {
                // Verify the completion page appears
                cy.get('.alert-success').should('be.visible');

                // Verify the "Take New Quiz" button and click it to restart
                cy.contains('Take New Quiz').should('exist').click();
            }
        }
    });
});
