// ***********************************************************

// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import custom commands using ES2015 syntax:
import './commands'

// Alternatively, you can use CommonJS syntax:
// require('./commands')

import React from 'react';
import { mount, MountOptions, MountReturn } from 'cypress/react18';
import { MemoryRouterProps, MemoryRouter } from 'react-router-dom';

// Extend the Cypress namespace to include type definitions for
// custom commands, making it easier to use in your specs.
// This can also be defined in a separate file like cypress/support/component.d.ts,
// where you can add a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;

  // Wrapping the component with the MemoryRouter to simulate routing behavior
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>;

  // Mount the component inside the router context with the provided options
  return mount(wrapped, mountOptions);
});

// Example usage:
// cy.mount(<MyComponent />)
