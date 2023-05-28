import { useTranslation } from 'react-i18next';
import { ReactComponent as FieldsIcon } from '../../../assets/fields.svg';
import { schemaStore } from '../../../store';
import BackLink from '../BackLink';
import Query from '../Query';

const Queries = () => {
  const { queryFields, headerText } = schemaStore;

  const { t } = useTranslation();

  const fieldElements = queryFields
    ? Object.entries(queryFields).map(([fieldName, field]) => (
        <div className="mt-4" key={fieldName}>
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

      <h3 className="text-2xl mt-3">{headerText}</h3>
      <div className="flex items-center mt-5">
        <FieldsIcon className="mr-2" />
        <h6 className="text-sm">{t('docs.tools.fields')}</h6>
      </div>
      {fieldElements}
    </div>
  );
};

export default Queries;
