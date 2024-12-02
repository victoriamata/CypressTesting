import Quiz from "../../client/src/components/Quiz";
import { mount } from "cypress/react";

describe("Quiz", () => {
  beforeEach(() => {
    // mount the component
    mount(<Quiz />);
  });

  it('should display the "Start Quiz" button', () => {
    // Check if the "Start Quiz" button is visible
    cy.get("button").should("have.text", "Start Quiz"); // contains text

  it('should start a multiple choice quiz once the Start Quiz button is clicked', () => {
    cy.get('button').contains("Start Quiz").click();
  })
  });
});
