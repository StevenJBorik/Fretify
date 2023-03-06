
describe('Callback', () => {
  it('Retrieves the access token from the hash params', () => {
    const accessToken = 'fake_access_token'
    const expiresIn = '3600'
    const tokenType = 'Bearer'
    const state = 'fake_state'
    const hash = `#access_token=${accessToken}&token_type=${tokenType}&expires_in=${expiresIn}&state=${state}`
    cy.visit(`/callback${hash}`)
    const params = getHashParams()
    expect(params.access_token).to.equal(accessToken)
    expect(params.token_type).to.equal(tokenType)
    expect(params.expires_in).to.equal(expiresIn)
    expect(params.state).to.equal(state)
  })

  it('Displays an error message if token retrieval fails', () => {
    const code = 'fake_code'
    const errorMessage = 'Failed to retrieve token'
    cy.intercept('POST', '/api/token', {
      statusCode: 500,
      body: {
        error: 'server_error',
        error_description: errorMessage,
      },
    })
    cy.visit(`/callback?code=${code}`)
    cy.get('[data-cy=error-message]').should('contain', errorMessage)
  })
})