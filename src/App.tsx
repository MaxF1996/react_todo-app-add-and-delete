import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, addTodo, deleteTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { Errors } from './types/Errors';
import { useDelayedSetState } from './hooks/useDelayedSetState';
import { Header } from './blocks/Header';
import { Footer } from './blocks/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentError, setCurrentError] = useState<Errors | null>(null);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.all);
  const [title, setTitle] = useState<string>('');
  const [isNewTodoAdding, setIsNewTodoAdding] = useState<boolean>(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isAdded, setIsAdded] = useState<boolean | null>(false);
  const [todoIdForRemoving, setTodoIdForRemoving] = useState<number | null>(
    null,
  );
  const [isTodoDeleting, setIsTodoDeleting] = useState<boolean>(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setCurrentError(Errors.load);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useDelayedSetState(currentError, setCurrentError);
  useDelayedSetState(isAdded, setIsAdded, false, 1000);

  useEffect(() => {
    if (!title) {
      return;
    }

    const newTodo = { id: 0, userId: USER_ID, title, completed: false };

    setIsNewTodoAdding(true);
    setTempTodo(newTodo);

    addTodo(title)
      .then((todo: Todo) => {
        setTodos([...todos, todo]);
        setIsAdded(true);
      })
      .catch(() => {
        setCurrentError(Errors.add);
      })
      .finally(() => {
        setIsNewTodoAdding(false);
        setTempTodo(null);
      });

    setTitle('');
  }, [title]);

  const onFilterChange = (filter: Filters) => {
    if (currentFilter === filter) {
      return;
    }

    setCurrentFilter(filter);

    const { all, active, completed } = Filters;

    switch (filter) {
      case all:
        setFilteredTodos(todos);
        break;
      case active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
    }
  };

  const isAllCompleted = useMemo(() => {
    return filteredTodos.every(todo => todo.completed);
  }, [filteredTodos]);

  const uncompletedCount = useMemo(() => {
    return todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0);
  }, [todos]);

  useEffect(() => {
    if (!isTodoDeleting || !todoIdForRemoving) {
      return;
    }

    deleteTodo(todoIdForRemoving)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoIdForRemoving));
      })
      .catch(() => {
        setCurrentError(Errors.delete);
      })
      .finally(() => {
        setIsTodoDeleting(false);
        setTodoIdForRemoving(null);
      });
  }, [isTodoDeleting, todoIdForRemoving]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          filteredTodos={filteredTodos}
          isAllCompleted={isAllCompleted}
          setTitle={setTitle}
          setCurrentError={setCurrentError}
          isNewTodoAdding={isNewTodoAdding}
          isAdded={isAdded}
          currentError={currentError}
          todoIdForRemoving={todoIdForRemoving}
        />

        <TodoList
          filteredTodos={filteredTodos}
          loadingTodo={tempTodo}
          isNewTodoAdding={isNewTodoAdding}
          isTodoDeleting={isTodoDeleting}
          setIsTodoDeleting={setIsTodoDeleting}
          todoIdForRemoving={todoIdForRemoving}
          setTodoIdForRemoving={setTodoIdForRemoving}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            uncompletedCount={uncompletedCount}
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification currentError={currentError} />
    </div>
  );
};
