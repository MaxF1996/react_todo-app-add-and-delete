type Props = {
  completedCount: number;
  setIsTodoDeleting: (isTodoDeleting: boolean) => void;
};

export const ClearCompletedButton: React.FC<Props> = ({ completedCount }) => {
  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={completedCount === 0}
    >
      Clear completed
    </button>
  );
};
