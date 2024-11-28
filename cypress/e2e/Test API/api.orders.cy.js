describe("Accèder aux données confidentielles d'un utilisateur avant connexion", () => {


  it("Devrait vérifier que je reçois une erreur 401 avant connexion", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/orders`,
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(401);
    });
  });
  
  it('Devrait se connecter avec succès avec des identifiants valides', () => {
    const apiLogin = `${Cypress.env("apiUrl")}/login`;
    
    cy.request({
      method: "POST",
      url: apiLogin,
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");

    cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/orders`,
        headers: {
          Authorization: `Bearer ${response.body.token}`
        },
        failOnStatusCode: false,
      }).then((orderResponse) => {
        expect(orderResponse.status).to.eq(200);
      });
    });
  });

  it("Devrait vérifier qu'un utilisateur non authentifié reçoit une erreur 403 lorsqu'il tente d'accéder au panier", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/orders`,
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(403);
    });
  });

});
