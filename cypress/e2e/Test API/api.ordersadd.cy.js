describe('Test Api ajout produit', () => {
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

    it("Ajouter un produit disponible ou renvoyer une erreur si stock nul", () => {
        const productId = 5;

        cy.request({
            method: "GET",
            url: `http://localhost:8081/products/${productId}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            failOnStatusCode: false,
        }).then((productResponse) => {
            expect(productResponse.status).to.eq(200);
            expect(productResponse.body).to.have.property("id", productId);

            const stock = productResponse.body.availableStock;
            if (stock <= 0 || stock === null) {
                cy.log("Produit en rupture de stock");
                throw new Error("Rupture de stock - Impossible d'ajouter le produit.");
            }

            cy.request({
                method: "PUT",
                url: `http://localhost:8081/orders/add`,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: {
                    product: productId,
                    quantity: 1,
                },
            }).then((addResponse) => {
                expect(addResponse.status).to.eq(200);
                cy.log("Produit ajoute avec succes :", productResponse.body);
            });
        });
    });

    it("Ajoute un produit dans le panier avec product=1 et quantity=1", () => {
        cy.request({
            method: "PUT",
            url: `http://localhost:8081/orders/add`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: {
                product: 1,
                quantity: 1,
            },
            failOnStatusCode: false,
        }).then((addResponse) => {
            expect(addResponse.status).to.eq(200);
            expect(addResponse.body).to.have.property('orderLines');
            cy.log("Produit ajoute avec succes :", addResponse.body);
        });
    });
});
