import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TempTodo } from '../TempTodo';

type Props = {
  filteredTodos: Todo[];
  isNewTodoAdding: boolean;
  loadingTodo: Todo | null;
  todoIdsForRemoving: number[] | null;
  isTodoDeleting: boolean;
  setIsTodoDeleting: (isTodoDeleting: boolean) => void;
  setTodoIdsForRemoving: (id: number[] | null) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  isNewTodoAdding,
  loadingTodo,
  todoIdsForRemoving,
  isTodoDeleting,
  setTodoIdsForRemoving,
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
          todoIdsForRemoving={todoIdsForRemoving}
          setTodoIdsForRemoving={setTodoIdsForRemoving}
        />
      ))}

      {isNewTodoAdding && (
        <TempTodo
          key={loadingTodo!.id}
          isNewTodoAdding={isNewTodoAdding}
          loadingTodo={loadingTodo!}
          todoIdsForRemoving={todoIdsForRemoving}
        />
      )}
    </section>
  );
};
