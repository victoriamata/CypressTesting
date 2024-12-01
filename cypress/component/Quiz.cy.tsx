import Quiz from "../../client/src/components/Quiz";
import { mount } from "cypress/react";

describe("Quiz", () => {
  it('should display the "Start Quiz" button', () => {
    // mount the component
    mount(<Quiz />);

    // Check if the "Start Quiz" button is visible
    cy.get("button")
      .contains("Start Quiz") // contains text
      .should("be.visible"); // display button
  });
});
