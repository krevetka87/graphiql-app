import ReactMarkdown from 'react-markdown';
import { schemaStore } from '../../../store';
import BackLink from '../BackLink/BackLink';

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
          <h1 className="text-2xl mt-3 ">{schemaStore.headerText}</h1>
          <div className="mt-5">
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
