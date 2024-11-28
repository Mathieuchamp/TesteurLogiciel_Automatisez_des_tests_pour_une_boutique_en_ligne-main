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

    it("Détail d'un produit aléatoire avec stock disponible", () => {
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

            expect(randomProduct).to.have.property("skin").that.is.a("string");
            expect(randomProduct).to.have.property("aromas").that.is.a("string");
            expect(randomProduct).to.have.property("ingredients").that.is.a("string");
            expect(randomProduct).to.have.property("description").that.is.a("string");
            expect(randomProduct).to.have.property("price").that.is.a("number");
            expect(randomProduct).to.have.property("picture").that.is.a("string");
            expect(randomProduct).to.have.property("varieties").that.is.a("number");

            cy.request({
                method: "GET",
                url: `${apiUrl}/products/${randomProduct.id}`,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }).then((productResponse) => {
                expect(productResponse.status).to.eq(200);
                cy.log("Détail du produit récupéré avec succès :", productResponse.body);
            });
        });
    });
});
