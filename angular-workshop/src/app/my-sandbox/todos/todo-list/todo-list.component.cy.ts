import { TodoListComponent } from './todo-list.component'

describe('TodoListComponent', () => {
  it('should mount', () => {
    cy.mount(TodoListComponent)
  })
})