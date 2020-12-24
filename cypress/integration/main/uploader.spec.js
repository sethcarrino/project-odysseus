/// <reference types="Cypress" />

context("Music Uploader Test", () => {
  it("Visit uploder", () => {
    cy.visit("/");
    cy.wait(10000);
  });
});
