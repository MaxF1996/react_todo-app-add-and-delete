import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TempTodo } from '../TempTodo';

type Props = {
  filteredTodos: Todo[];
  isNewTodoAdding: boolean;
  loadingTodo: Todo | null;
  todoIdForRemoving: number | null;
  isTodoDeleting: boolean;
  setIsTodoDeleting: (isTodoDeleting: boolean) => void;
  setTodoIdForRemoving: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  isNewTodoAdding,
  loadingTodo,
  todoIdForRemoving,
  isTodoDeleting,
  setTodoIdForRemoving,
  setIsTodoDeleting,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isTodoDeleting={isTodoDeleting}
          setIsTodoDeleting={setIsTodoDeleting}
          todoIdForRemoving={todoIdForRemoving}
          setTodoIdForRemoving={setTodoIdForRemoving}
        />
      ))}

      {isNewTodoAdding && (
        <TempTodo
          key={loadingTodo!.id}
          isNewTodoAdding={isNewTodoAdding}
          loadingTodo={loadingTodo!}
          todoIdForRemoving={todoIdForRemoving}
        />
      )}
    </section>
  );
};
