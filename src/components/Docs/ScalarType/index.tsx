import ReactMarkdown from 'react-markdown';
import { schemaStore } from '../../../store';
import BackLink from '../BackLink';

const ScalarType = () => {
  const { scalarType, headerText } = schemaStore;

  const handleBackHistory = () => {
    const { history } = schemaStore;
    const lastAction = history[history.length - 1];

    schemaStore.loadPreviousState(lastAction);
    schemaStore.removeLastStateFromHistory();
  };

  return (
    <div>
      <BackLink handleBackHistory={handleBackHistory} />

      {scalarType ? (
        <>
          <h3 className="text-2xl mt-3 ">{headerText}</h3>
          <div className="mt-4">
            <ReactMarkdown>{String(scalarType.description)}</ReactMarkdown>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default ScalarType;
