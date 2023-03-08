describe('Callback component', () => {
  // it('should display token data after successful fetch', () => {
  //   cy.intercept('POST', 'https://accounts.spotify.com/api/token').as('getTokenData');
  //   cy.visit('http://localhost:3000/callback?grant_type=client_credentials&code=AQD3zVL82b0SlI4KNcgqV_Q5ejEMEOITuBFjwRx3AmvPho0sbG2C8gFQeZ3Ni8Hhgw60S9EHwjMP0jAPyNbOnD5EyylGoEmHTOV3wDfVo6hrD_CxaWTDTulE-sMeFHE9ILF5t9AD5N8pdlXuE8GYUz5EpGrFLtsHMvQK76BJwkc-qGJYq6CRpPu6-BQYELPyoVdQ2O8xZGlJyZBDWdIIeRYXHiduaEUtk4luKioAGjQ1IiWStWDoHvtY9LImzn9v_2p1OyaMnR4TmjRFINa7tc1jpRnKEUwYlakxZaq7wECK6LZ9Qo8HYmbpW681oPk6i3OJgumjmhcDv_JBtlhX9yiQOegNKMA6Jb1x4oAIUsnh&grant_type=client_credentials');
  //   cy.wait('@getTokenData').its('request.body').should('include', {
  //     // grant_type: 'client_credentials',
  //     code: 'AQD3zVL82b0SlI4KNcgqV_Q5ejEMEOITuBFjwRx3AmvPho0sbG2C8gFQeZ3Ni8Hhgw60S9EHwjMP0jAPyNbOnD5EyylGoEmHTOV3wDfVo6hrD_CxaWTDTulE-sMeFHE9ILF5t9AD5N8pdlXuE8GYUz5EpGrFLtsHMvQK76BJwkc-qGJYq6CRpPu6-BQYELPyoVdQ2O8xZGlJyZBDWdIIeRYXHiduaEUtk4luKioAGjQ1IiWStWDoHvtY9LImzn9v_2p1OyaMnR4TmjRFINa7tc1jpRnKEUwYlakxZaq7wECK6LZ9Qo8HYmbpW681oPk6i3OJgumjmhcDv_JBtlhX9yiQOegNKMA6Jb1x4oAIUsnh',
  //     redirect_uri: 'http://localhost:3000/callback',
  //     client_id: '6df6b59cb94b4bfbb76803a2092a11ee', 
  //     client_secret: 'd4e56a8f3ba0415788089db89d49b931'
  //   });
  //   cy.fixture('tokenData.json').then((tokenData) => {
  //     cy.wrap(tokenData).as('tokenData');
  //   });
  //   cy.get('@tokenData').then((tokenData) => {
  //     cy.get('pre').should('contain.text', tokenData.access_token);
  //   });
  // });

  it('should display error message when error is present in query', () => {
    cy.visit('http://localhost:3000/callback?error=invalid_grant');
    cy.get('h1').should('contain.text', 'Error');
    cy.get('p').should('contain.text', 'invalid_grant');
  });
});
