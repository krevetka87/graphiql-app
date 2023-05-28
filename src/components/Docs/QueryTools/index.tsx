import { useTranslation } from 'react-i18next';
import { schemaStore } from '../../../store';

import { ReactComponent as ArgumentsIcon } from '../../../assets/arguments.svg';
import { ReactComponent as TypeIcon } from '../../../assets/type.svg';
import Arguments from '../Arguments';
import TypeFormat from '../TypeFormat';
import BackLink from '../BackLink';

const QueryTools = () => {
  const { queryField, headerText } = schemaStore;

  const { t } = useTranslation();

  const handleBackHistory = () => {
    const { history } = schemaStore;
    const lastAction = history[history.length - 1];

    schemaStore.loadPreviousState(lastAction);
    schemaStore.removeLastStateFromHistory();
  };

  return (
    <div>
      <BackLink handleBackHistory={handleBackHistory} />

      {queryField ? (
        <>
          <h3 className="text-2xl  mt-3">{headerText}</h3>
          <div className="mt-6">{queryField.description}</div>

          {queryField.args && queryField.args.length ? (
            <>
              <div className="flex items-center mt-5">
                <ArgumentsIcon className="mr-2" />
                <p className="text-sm">{t('docs.tools.arguments')}</p>
              </div>
              <div className="mt-3 ml-2">
                <Arguments args={queryField.args} />
              </div>
            </>
          ) : (
            ''
          )}

          <div className="flex items-center mt-5">
            <TypeIcon className="mr-2" />
            <p className="text-sm">{t('docs.tools.type')}</p>
          </div>
          <div className="ml-2 mt-3">
            <TypeFormat arg={String(queryField.type)} />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default QueryTools;
