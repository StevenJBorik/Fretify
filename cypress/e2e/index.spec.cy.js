describe('Index Page', () => {
  it('should redirect to Spotify authorization page on button click', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Login with Spotify').click();
    // cy.url().should('include', 'accounts.spotify.com/authorize');
    // cy.url().should('include', `response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20streaming%20playlist-read-private%20user-library-read%20user-read-private%20user-read-email`);
  });
});