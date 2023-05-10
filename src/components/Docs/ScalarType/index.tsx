import ReactMarkdown from 'react-markdown';
import { schemaStore } from '../../../store';
import BackLink from '../BackLink';

function ScalarType() {
  const type = schemaStore.scalarType;

  const handleBackHistory = () => {
    const { history } = schemaStore;
    const lastAction = history[history.length - 1];

    schemaStore.loadPreviousState(lastAction);
    schemaStore.removeLastStateFromHistory();
  };

  return (
    <div>
      <BackLink handleBackHistory={handleBackHistory} />

      {type ? (
        <>
          <h3 className="text-2xl mt-3 ">{schemaStore.headerText}</h3>
          <div className="mt-4">
            <ReactMarkdown>{String(type.description)}</ReactMarkdown>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default ScalarType;
