describe('Smoke tests', () => {
  it('Vérifie la présence des champs et boutons de connexion', () => {
    cy.visit("http://localhost:8080/");
    cy.contains("Connexion").should("be.visible").click();
    cy.get('[data-cy="login-input-username"]').should("be.visible");
    cy.get('[data-cy="login-input-password"]').should("be.visible");
    cy.get('[data-cy="login-submit"]').should("be.visible");
  });

  it("Vérifie la présence des boutons d’ajout au panier et du champ de disponibilité du produit", () => {
    cy.visit("http://localhost:8080");
    cy.contains("Connexion").should("be.visible").click();
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
    cy.get('[data-cy="login-input-password"]').type("testtest");
    cy.get('[data-cy="login-submit"]').click();
    cy.wait(2000);
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").then(($products) => {
      for (let i = 0; i < $products.length; i++) {
        cy.get("[data-cy='product-link']").eq(i).click();
        cy.get("[data-cy='detail-product-add']").should("be.visible");
        cy.get("[data-cy='detail-product-stock']").should("be.visible");
        cy.go("back");
      }
    });
  });
  

  it("Vérifie la présence des champ de disponibilité du produit", () => {
    cy.visit("http://localhost:8080");
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").then(($products) => {
      for (let i = 0; i < $products.length; i++) {
    cy.get("[data-cy='product-link']").eq(i).click();
    cy.get("[data-cy='detail-product-stock']").should("be.visible");
    cy.go("back");
      }
    });
  });
});
