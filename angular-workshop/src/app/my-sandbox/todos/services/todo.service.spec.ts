import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';

describe('TodoService', () => {
  let service: TodoService;

  // Fake todos and response object
  // const todos = ['shop groceries', 'mow the lawn', 'take the cat to the vet'];
  const mockTodos = [
    {
      id: 1,
      title: 'Finish project documentation',
      description: 'Complete the documentation for the new frontend features.',
      dueDate: '2024-08-20',
      completed: false,
    },
  ];
  const okResponse = new Response(JSON.stringify(mockTodos), {
    status: 200,
    statusText: 'OK',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**FAKING DEPENDENCIES */
  it('gets the to-dos : faking dependencies', async () => {
    // Arrange
    const fetchSpy: any = jasmine.createSpy('fetch').and.returnValue(okResponse);
    const spyReturnedVal = await fetchSpy().json();
    console.log('spyReturnedVal: ', spyReturnedVal);

    // Assert
    expect(spyReturnedVal[0].title).toEqual('Finish project documentation');
    // expect(fetchSpy).toHaveBeenCalledWith('/todos');
    expect(fetchSpy).toHaveBeenCalledWith();
  });
  

  /**FAKING DEPENDENCIES and COMPARING WITH ACTUAL VALUE */
  xit('gets the to-dos : faking dependencies & comparing with the actual value', async () => {
    // Arrange
    const fetchSpy: any = jasmine.createSpy('fetch').and.returnValue(okResponse);
    console.log('fetchSpy(): ', fetchSpy());
    const todoService = new TodoService(fetchSpy);
    // Act
    const actualTodos =
      await todoService.getTodos(); /**fetching original data in the TodoService */

    const spyReturnedVal = await fetchSpy().json();
    console.log('spyReturnedVal: ', spyReturnedVal);

    console.log('actualTodos: ', actualTodos);

    // Assert
    expect(actualTodos[0].title).toEqual(mockTodos[0].title);
    // expect(fetchSpy).toHaveBeenCalledWith('/todos');
    expect(fetchSpy).toHaveBeenCalledWith();
  });





  /**FAKING DEPENDENCIES and COMPARING WITH ACTUAL VALUE */
  xit('gets the to-dos : faking dependencies & comparing with the actual value', async () => {
    // Arrange
    const fetchSpy: any = spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(okResponse),
      } as Response),
    );

    // Act
    const actualResponse =
      await service.getTodos(); /**fetching original data in the TodoService */
    // console.log('actualTodos: ', await actualTodos.json());
    console.log('mockTodos: ', mockTodos);

    let actualTodos = await actualResponse.json();
    console.log('actualTodos: ', await actualTodos);
    // Assert
    expect(actualTodos).toEqual(mockTodos);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/todos');
  });

  xit('should fetch a list of todos', async () => {
    // Arrange
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true },
    ];

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
      } as Response),
    );

    // Act
    const todos = await service.getTodos();
    console.log('todos@: ', todos);

    // Assert
    expect(todos).toEqual(mockTodos);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/todos');
  });
});
