import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  isNewTodoAdding: boolean;
  loadingTodo: Todo;
  todoIdForRemoving: number | null;
};

export const TempTodo: React.FC<Props> = ({
  isNewTodoAdding,
  loadingTodo,
  todoIdForRemoving,
}) => {
  return (
    <TodoItem
      todo={loadingTodo}
      isNewTodoAdding={isNewTodoAdding}
      todoIdForRemoving={todoIdForRemoving}
    />
  );
};
