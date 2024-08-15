import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';

describe('TodoService', () => {
  let service: TodoService;

  /** Fake todos and response object */
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

  /** Fake Error Response */
  const mockError = 'Not Found';
  const errorResponse = new Response(JSON.stringify(mockError), {
    status: 404,
    statusText: 'Not Found',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
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
  xit('gets the to-dos : faking dependencies & comparing with the actual value', async () => {
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

  xit('handles an HTTP error when getting the to-dos', async () => {
    await errorResponse.json();

    // Arrange
    const fetchSpy = jasmine
      .createSpy('fetch error sample')
      .and.returnValue(errorResponse);

    // Replace the global fetch with our spy
    (window as any).fetch = fetchSpy;

    // Act
    let error;
    try {
      await service.getTodos();
    } catch (e) {
      // console.log("e: ", e);
      error = e;
    }
    // Assert
    expect(error).toEqual(new Error('HTTP error: 404 Not Found'));
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

  /**FAKING DEPENDENCIES and COMPARING WITH ACTUAL VALUE (spyOn) [ Ensure that you're not calling spyOn(window, 'fetch') more than once in your test.]*/

  it('gets the to-dos : faking dependencies & comparing with the actual value', async () => {
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

  it('should fetch a list of todos', async () => {
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
    console.debug('todos@: ', todos);

    // Assert
    expect(todos).toEqual(mockTodos);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3000/todos');
  });
});

/** 
 * NOTE: 

Error: <spyOn> : fetch has already been spied upon
        Usage: spyOn(<object>, <methodName>)

  SOLUTION: 
    1. Check for Duplicate Spies:

      Ensure that you're not calling spyOn(window, 'fetch') more than once in your test. If you need to spy on fetch multiple times in different tests, make sure to clean up the spy after each test.

      afterEach(() => {
          jest.restoreAllMocks(); // Restores all mocked functions to their original state
      });

    2. Use jest.clearAllMocks() or jest.resetAllMocks():

      You can add these in your afterEach to clear or reset mocks between tests.

      afterEach(() => {
          jest.clearAllMocks(); // Clears all mocks
          // or 
          jest.resetAllMocks(); // Resets all mocks
      });

    3. Avoid Overlapping Spies:

      If you're spying on fetch in different parts of your test suite, ensure that the spies don't overlap. You might want to scope the spy to a specific test or group of tests using describe and beforeEach/afterEach blocks.

      describe('Test suite for fetch', () => {
          beforeEach(() => {
              spyOn(window, 'fetch');
          });

          afterEach(() => {
              jest.restoreAllMocks();
          });

          // Your tests here
      });

 */
// Example:
//   Here’s how you might structure your tests:

// describe('Test fetch functionality', () => {
//     beforeEach(() => {
//         spyOn(window, 'fetch').and.returnValue(Promise.resolve(/* mock response */ //));
//     });

//     afterEach(() => {
//         jest.restoreAllMocks(); // or jest.clearAllMocks();
//     });

//     it('should call fetch with the correct URL', () => {
//         // Your test logic here
//     });

//     it('should handle fetch error', () => {
//         // Another test logic here
//     });
// });

// If you follow this structure, it should prevent the "fetch has already been spied upon" error.
