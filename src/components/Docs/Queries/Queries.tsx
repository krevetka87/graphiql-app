import { ReactComponent as FieldsIcon } from '../../../assets/fields.svg';
import { schemaStore } from '../../../store';
import BackLink from '../BackLink/BackLink';
import Query from '../Query/Query';

function Queries() {
  const fields = schemaStore.queryFields;

  const fieldElements = fields
    ? Object.entries(fields).map(([fieldName, field]) => (
        <div className="mt-5" key={fieldName}>
          <Query field={field} />
        </div>
      ))
    : null;

  const handleBackHistory = () => {
    const { history } = schemaStore;
    const lastAction = history[history.length - 1];

    schemaStore.loadPreviousState(lastAction);
    schemaStore.removeLastStateFromHistory();
  };

  return (
    <div>
      <BackLink handleBackHistory={handleBackHistory} />

      <h2 className="text-2xl mt-3">{schemaStore.headerText}</h2>
      <div className="flex items-center mt-5">
        <FieldsIcon className="mr-2" />
        <p className="text-sm">Fields</p>
      </div>
      {fieldElements}
    </div>
  );
}

export default Queries;
