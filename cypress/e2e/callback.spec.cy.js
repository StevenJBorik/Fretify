describe('Callback component', () => {
  it('should display token data after successful fetch', () => {
    cy.visit('http://localhost:3000/callback?code=wqiiUUm0T0fGaM6NALWew5uMIhhSjPSnyVWVKyeZSv2YdahXCRvDs4mXBxqp2xXo8zSXY2h4z7ioxSOA2TnuJy&grant_type=authorization_code');
    cy.intercept('POST', 'https://accounts.spotify.com/api/token', {
      fixture: 'tokenData.json'
    }).as('getTokenData');
    cy.get('p').should('contain.text', 'Loading...');
    cy.wait('@getTokenData').its('request.body').should('contain', {
      grant_type: 'authorization_code',
      code: 'AQCmvkqkQuy-wqiiUUm0T0fGaM6NALWew5uMIhhSjPSnyVWVKyeZSv2YdahXCRvDs4mXBxqp2xXo8zSXY2h4z7ioxSOA2TnuJy-LH7yJ8ISpXH5xo6qzBtYaKV-EKH7o6So',
      redirect_uri: 'http://localhost:3000/callback', 
      client_id: '6df6b59cb94b4bfbb76803a2092a11ee', 
      client_secret: 'd4e56a8f3ba0415788089db89d49b931'
    });
    cy.get('pre').should('contain.text', 'access_token');
  });

  it('should display error message when error is present in query', () => {
    cy.visit('http://localhost:3000/callback?error=invalid_grant');
    cy.get('p').should('not.contain.text', 'Loading...');
    cy.get('h1').should('contain.text', 'Error');
    cy.get('p').should('contain.text', 'invalid_grant');
  });
});
