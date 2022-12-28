describe("Blog app", function () {
  beforeEach(function () {
    //cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("login").click();
  });
  it("user can login", function () {
    cy.contains("login").click();
    cy.get("input:first").type("groot");
    cy.get("input:last").type("password");
    cy.get("#login-button").click();

    cy.contains("root logged-in");
  });
});
