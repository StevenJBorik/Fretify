describe('refresh access token', () => {
    it('requests a new access token using the refresh token', () => {
      const client_id = '6df6b59cb94b4bfbb76803a2092a11ee';
      const client_secret = 'd4e56a8f3ba0415788089db89d49b931';
      const refresh_token = 'AQAJTSM5udUqy00uCWw3ow79oQCEael6e3uJhTn8ziDTLIAA8DqFgMatmgch6WOtS1dNLMIidLaYQOnk9XsFiVliuSH5eZwhqBMkYosdvT4fBF7YyX2anXSKqSaLStrUum8';
  
  
      const basicAuth = btoa(`${client_id}:${client_secret}`);
  
      cy.request({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
          'grant_type': 'refresh_token',
          'refresh_token': refresh_token
        }
      })
        .its('body')
        .should('have.property', 'access_token');
    });
  });