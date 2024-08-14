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
  xit('gets the to-dos : faking dependencies', async () => {
    // Arrange
    const fetchSpy: any = jasmine.createSpy('fetch').and.returnValue(okResponse);
    const spyReturnedVal = await fetchSpy().json();
    console.log('spyReturnedVal: ', spyReturnedVal);

    // Assert
    expect(spyReturnedVal).toEqual(mockTodos);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/todos');
    // expect(fetchSpy).toHaveBeenCalledWith();
  });

  /**FAKING DEPENDENCIES and COMPARING WITH ACTUAL VALUE (jasmine.createSpy) */
  it('gets the to-dos : faking dependencies & comparing with the actual value', async () => {
    // Arrange
    // const fetchSpy: any = jasmine.createSpy('fetch').and.returnValue(okResponse);
    const fetchSpy: any = jasmine.createSpy('fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(okResponse),
      } as Response),
    );
    // const fetchSpy: any = jasmine.createSpy('fetch').and.callFake((url: string) => {
    //   console.group('url: ', url);
    //   return Promise.resolve({
    //     json: () => Promise.resolve(okResponse),
    //   } as Response);
    // });

    // Replace the global fetch with our spy
    (window as any).fetch = fetchSpy;

    // Act
    const actualTodos =
      await service.getTodos(); /**fetching original data in the TodoService */

    // console.log('actualTodos: ', actualTodos);

    // Assert
    expect(actualTodos).toEqual(okResponse);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/todos');
  });

  xit('should fetch a list of todos===', async () => {
    // Create a spy for the global fetch function
    let fetchSpy = jasmine.createSpy('fetch').and.callFake((url: string) => {
      console.group('url: ', url);
      // Mock response
      return Promise.resolve({
        json: () => Promise.resolve(okResponse),
      } as Response);
    });

    // Replace the global fetch with our spy
    (window as any).fetch = fetchSpy;

    // Act
    const todos = await service.getTodos();

    // Assert
    expect(todos).toEqual(okResponse);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/todos');
  });

  /**FAKING DEPENDENCIES and COMPARING WITH ACTUAL VALUE (spyOn) */
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
