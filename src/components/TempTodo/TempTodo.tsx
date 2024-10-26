import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  isNewTodoAdding: boolean;
  loadingTodo: Todo;
  todoIdsForRemoving: number[] | null;
};

export const TempTodo: React.FC<Props> = ({
  isNewTodoAdding,
  loadingTodo,
  todoIdsForRemoving,
}) => {
  return (
    <TodoItem
      todo={loadingTodo}
      isNewTodoAdding={isNewTodoAdding}
      todoIdsForRemoving={todoIdsForRemoving}
    />
  );
};
