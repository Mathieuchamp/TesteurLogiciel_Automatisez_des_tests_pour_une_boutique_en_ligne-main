describe('Ajouter un avis', () => {
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

    it("Ajouter un avis complet", () => {
        const ReviewData = {
            title: "Test au top",
            comment: "Très satisfait de ce produit.",
            rating: 5,
        };

        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: ReviewData,
            failOnStatusCode: false,
        }).then((addReviewResponse) => {

            expect(addReviewResponse.status).to.eq(200); 

            expect(addReviewResponse.body).to.have.property('comment', ReviewData.comment);
        });
    });
});
