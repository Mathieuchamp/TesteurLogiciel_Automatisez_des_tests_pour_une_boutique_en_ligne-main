describe("Acceder aux donnees confidentielles d'un utilisateur avant connexion", () => {


  it("Devrait verifier que je reçois une erreur 401 à l acces au panier avant connexion", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/orders`,
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(401);
    });
  });
  
  it('Devrait avoir acces au panier avec des identifiants valides', () => {
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

  it("Devrait verifier qu'un utilisateur non authentifie reçoit une erreur 403 lorsqu il tente d'acceder au panier d'un autre utilisateur", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/orders`,
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(403);
    });
  });

});
