describe("Panier", () => {

  it("Devrait se connecter avec succès, afficher le bouton panier et le contenu du panier", () => {
    cy.visit("http://localhost:8080/");
    cy.contains("Connexion").should("be.visible").click();
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
    cy.get('[data-cy="login-input-password"]').type("testtest");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-cart"]').should("be.visible").click();
    cy.get('[data-cy="cart-submit"]').should("be.visible");
  });
});