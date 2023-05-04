import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IntrospectionQuery } from 'graphql';
import getApiSchema from '../../api/schemaApi';
import { handleRequest } from '../../utils/editorHelpers';
import QueryEditor from './QueryEditor';
import VariablesEditor from './VariablesEditor';
import ResultEditor from './ResultEditor';
import PlayButton from './PlayButton';

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
    <div className="flex">
      <div className="flex flex-1 min-w-0">
        <div>
          <PlayButton onClick={handleRequest} />
        </div>
        <div className="flex-col flex-1 min-w-0">
          <QueryEditor introspection={schema} />
          <VariablesEditor />
        </div>
      </div>
      <ResultEditor />
    </div>
  );
});

export default GraphQLEditor;
