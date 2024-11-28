describe('Test Api Description produit by ID', () => {
    const apiUrl = Cypress.env("apiUrl");
    let authToken;

    beforeEach(() => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/login`,
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);
            authToken = loginResponse.body.token;
        });
    });

    it("Detail d'un produit aleatoire avec stock disponible", () => {
        cy.request({
            method: "GET",
            url: `${apiUrl}/products`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then((productsResponse) => {
            expect(productsResponse.status).to.eq(200);

            const availableProducts = productsResponse.body.filter(product => product.availableStock > 0);
            expect(availableProducts.length).to.be.greaterThan(0, "Aucun produit disponible en stock");

            const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];

            const expectedProductProperties = {
                skin: "string",
                aromas: "string",
                ingredients: "string",
                description: "string",
                price: "number",
                picture: "string",
                varieties: "number",
              };
              Object.entries(expectedProductProperties).forEach(([property, type]) => {
                expect(randomProduct).to.have.property(property).that.is.a(type);
              });
                           

            cy.request({
                method: "GET",
                url: `${apiUrl}/products/${randomProduct.id}`,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }).then((productResponse) => {
                expect(productResponse.status).to.eq(200);
                cy.log("Detail du produit récupere avec succes :", productResponse.body);
            });
        });
    });
});
