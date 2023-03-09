describe('Index Page', () => {
  it('should redirect to Spotify authorization page on button click', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Login with Spotify').click();
  });
});