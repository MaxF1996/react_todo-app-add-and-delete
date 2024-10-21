import classNames from 'classnames';
import { Errors } from '../../types/Errors';

type Props = {
  currentError: string | null;
};

export const ErrorNotification: React.FC<Props> = ({ currentError }) => {
  const { load, title, add, delete: deleteError, update } = Errors;

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: currentError === null,
        },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {currentError === load && load}
      {currentError === title && title}
      {currentError === add && add}
      {currentError === deleteError && deleteError}
      {currentError === update && update}
    </div>
  );
};
