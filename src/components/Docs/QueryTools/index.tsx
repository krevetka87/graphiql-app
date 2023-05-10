import { schemaStore } from '../../../store';

import { ReactComponent as ArgumentsIcon } from '../../../assets/arguments.svg';
import { ReactComponent as TypeIcon } from '../../../assets/type.svg';
import Arguments from '../Arguments';
import TypeFormat from '../TypeFormat';
import BackLink from '../BackLink';

function QueryTools() {
  const field = schemaStore.queryField;

  const handleBackHistory = () => {
    const { history } = schemaStore;
    const lastAction = history[history.length - 1];

    schemaStore.loadPreviousState(lastAction);
    schemaStore.removeLastStateFromHistory();
  };

  return (
    <div>
      <BackLink handleBackHistory={handleBackHistory} />

      {field ? (
        <>
          <h3 className="text-2xl  mt-3">{schemaStore.headerText}</h3>
          <div className="mt-6">{field.description}</div>

          {field.args && field.args.length ? (
            <>
              <div className="flex items-center mt-5">
                <ArgumentsIcon className="mr-2" />
                <p className="text-sm">Arguments</p>
              </div>
              <div className="mt-3 ml-2">
                <Arguments args={field.args} />
              </div>
            </>
          ) : (
            ''
          )}

          <div className="flex items-center mt-5">
            <TypeIcon className="mr-2" />
            <p className="text-sm">Type</p>
          </div>
          <div className="ml-2 mt-3">
            <TypeFormat arg={String(field.type)} />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default QueryTools;
