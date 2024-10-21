import { useEffect, useRef, useState } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  setTitle: (title: string) => void;
  setCurrentError: (error: Errors | null) => void;
  currentError: Errors | null;
  isNewTodoAdding: boolean;
  isAddedSuccessfully: boolean;
};

export const Form: React.FC<Props> = ({
  setTitle,
  setCurrentError,
  isNewTodoAdding,
  isAddedSuccessfully,
  currentError,
}) => {
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddedSuccessfully) {
      setCurrentTitle('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isAddedSuccessfully]);

  useEffect(() => {
    if (currentError === null) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [currentError]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = currentTitle.trim();

    if (trimmedTitle) {
      setTitle(trimmedTitle);
    } else {
      setCurrentError(Errors.title);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={currentTitle}
        onChange={e => setCurrentTitle(e.target.value)}
        disabled={isNewTodoAdding}
        ref={inputRef}
        autoFocus
      />
    </form>
  );
};
