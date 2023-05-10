import ReactMarkdown from 'react-markdown';
import { schemaStore } from '../../../store';

function ScalarType() {
  const type = schemaStore.scalarType;

  return (
    <div>
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
