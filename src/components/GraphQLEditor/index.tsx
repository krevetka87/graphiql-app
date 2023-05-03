import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IntrospectionQuery } from 'graphql';
import { Link } from 'react-router-dom';
import getApiSchema from '../../api/schemaApi';
import { handleRequest } from '../../utils/editorHelpers';
import QueryEditor from './QueryEditor';
import VariablesEditor from './VariablesEditor';
import ResultEditor from './ResultEditor';

const GraphQLEditor = observer(() => {
  const [schema, setSchema] = useState<IntrospectionQuery | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [schemaError, setSchemaError] = useState<string>('');

  useEffect(() => {
    if (schema) {
      return;
    }
    setLoading(true);
    getApiSchema()
      .then((data) => {
        setSchema(data);
      })
      .catch((err: Error) => setSchemaError(err.message))
      .finally(() => setLoading(false));
  }, [schema]);

  return (
    <>
      <div className="p-5 bg-neutral-300 relative flex items-stretch">
        <div className="flex basis-2/4 shrink-1 grow-0 items-start">
          <div className="flex-1">
            <QueryEditor introspection={schema} />
            <VariablesEditor />
          </div>
          <button type="button" className="mx-5" onClick={handleRequest}>
            Run
          </button>
        </div>
        <ResultEditor />
        {isLoading && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <h2>Loading...</h2>
          </div>
        )}
        {schemaError && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <h2>{schemaError}</h2>
          </div>
        )}
      </div>
      <Link to="/">Welcome</Link>
    </>
  );
});

export default GraphQLEditor;
