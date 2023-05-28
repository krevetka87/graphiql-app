import { useTranslation } from 'react-i18next';
import { ReactComponent as RootIcon } from '../../../assets/root.svg';
import { schemaStore } from '../../../store';
import { OpenState } from '../../../constants/docs';

const Root = () => {
  const { schema, headerText } = schemaStore;

  const { t } = useTranslation();

  const queryType = schema ? schema.getQueryType() : null;

  const fields = queryType ? queryType.getFields() : null;

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { target } = event;
    const text = (target as HTMLSpanElement).textContent || '';

    schemaStore.saveStateToHistory();

    schemaStore.setBackText(headerText);
    schemaStore.setHeaderText(text);

    schemaStore.setQueryFields(fields);
    schemaStore.setOpenState(OpenState.queryFields);
  };

  return (
    <div className="max-w-md">
      <h3 className="text-3xl">{headerText}</h3>
      <p className="mt-4">{t('docs.description')}</p>
      <div className="flex items-center my-4">
        <RootIcon className="mr-2" />
        <p className="text-sm">{t('docs.tools.root')}</p>
      </div>
      <strong className="mt-4 text-blue-500">
        query:{' '}
        {queryType ? (
          <span
            className="text-orange-500 hover:underline cursor-pointer font-normal"
            onClick={handleClick}
          >
            {queryType.name}
          </span>
        ) : (
          ''
        )}
      </strong>
    </div>
  );
};

export default Root;
