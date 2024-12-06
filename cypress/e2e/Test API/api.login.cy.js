describe('Test Api connexion', () => {
  const apiLogin = `${Cypress.env("apiUrl")}/login`;

  it('Devrait se connecter avec succes avec des identifiants valides', () => {
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
    });
  });

  it("Devrait echouer avec un code d'erreur 401 pour des identifiants invalides", () => {
    cy.request({
      method: "POST",
      url: apiLogin,
      body: {
        username: "utilisateur_invalide",
        password: "mot_de_passe_invalide",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      // Mettre à jour l'attendu pour qu'il corresponde à la réponse réelle de l'API
      expect(response.body).to.deep.equal({
        code: 401,
        message: "Invalid credentials.", // Mise à jour de l'attendu
      });
    });
  });
})
