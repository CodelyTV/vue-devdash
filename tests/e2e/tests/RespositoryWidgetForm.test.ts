import { RepositoryWidgetMother } from '../../RepositoryWidgetMother'

describe('Repository Widget Form', () => {
  it('Add new repository with id and url', () => {
    const newWidget = RepositoryWidgetMother.create({
      repositoryUrl: 'https://github.com/CodelyTV/DevDash',
    })

    cy.visit('/')

    cy.findByRole('button', {
      name: /Add repository/i,
    }).click()

    cy.findByLabelText(/Id/i).type(newWidget.id)
    cy.findByLabelText(/Repository URL/i).type(newWidget.repositoryUrl)

    cy.findByRole('button', {
      name: /Add/i,
    }).click()

    const widget = cy.findByText('CodelyTV/DevDash')

    widget.should('exist')
  })

  it('Show error when repository already exists in Dashboard', () => {
    const newWidget = RepositoryWidgetMother.create({
      repositoryUrl: 'https://github.com/CodelyTV/DevDash',
    })

    cy.visit('/')

    cy.findByRole('button', {
      name: /Add repository/i,
    }).click()

    cy.findByLabelText(/Id/i).type(newWidget.id)
    cy.findByLabelText(/Repository URL/i).type(newWidget.repositoryUrl)

    cy.findByRole('button', {
      name: /Add/i,
    }).click()

    cy.findByRole('button', {
      name: /Add repository/i,
    }).click()

    cy.findByLabelText(/Id/i).type(newWidget.id)
    cy.findByLabelText(/Repository URL/i).type(newWidget.repositoryUrl)

    cy.findByRole('button', {
      name: /Add/i,
    }).click()

    const errorMessage = cy.findByText(`The repository with url ${newWidget.repositoryUrl} already exists`)

    errorMessage.should('exist')
  })
})
