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
    cy.get("#username").type("groot");
    cy.get("#password").type("password");
    cy.get("#login-button").click();

    cy.contains("root logged-in");
  });

  describe("when logged-in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("groot");
      cy.get("input:last").type("password");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a new blog created by cypress");
      cy.get("#author").type("namuna");
      cy.get("#url").type("test.com");
      cy.get("#add").click();
      cy.contains("a new blog created by cypress namuna");
    });
  });
});
