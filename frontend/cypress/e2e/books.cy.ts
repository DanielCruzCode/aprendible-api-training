describe("Books", () => {
  it("can list, show, create, edit and delete books", () => {
    // List books
    cy.visit("/").get('a[data-cy="link-to-books"]').click();
    // Create books
    cy.get('[href="/books/create"]')
      .click()
      .get('input[data-cy="input-book-title"]')
      .type("new book title from cypress")
      .get('textarea[data-cy="input-book-description"]')
      .type("description from cypress")
      .get('button[data-cy="button-submit-book"]')
      .click()
      .get('[data-cy="book-list"]')
      .contains("new book title from cypress");
    // Show book
    cy.get("[data-cy^=link-to-visit-book-]")
      .last()
      .click()
      .get("h1")
      .should("contain.text", "new book title from cypress")
      .get('[href="/books"]')
      .click();

    // Edit book
    cy.get("[data-cy^=link-to-edit-book-]")
      .last()
      .click()
      .get('input[data-cy="input-book-title"]')
      .clear()
      .type("Updated book title from cypress")
      .get('textarea[data-cy="input-book-description"]')
      .clear()
      .type("description updated from cypress")
      .get('button[data-cy="button-submit-book"]')
      .click()
      .get('[data-cy="book-list"]')
      .contains("Updated book title from cypress");

    // Delete book
    cy.get("[data-cy^=link-to-delete-book-]")
      .last()
      .click()
      .should("not.contain.text", "Updated book title from cypress");
  });
});
