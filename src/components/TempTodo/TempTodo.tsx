import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  isNewTodoAdding: boolean;
  loadingTodo: Todo;
};

export const TempTodo: React.FC<Props> = ({ isNewTodoAdding, loadingTodo }) => {
  return <TodoItem todo={loadingTodo} isNewTodoAdding={isNewTodoAdding} />;
};
