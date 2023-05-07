import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IntrospectionQuery } from 'graphql';
import getApiSchema from '../../api/schemaApi';
import { handleRequest } from '../../utils/editorHelpers';
import QueryEditor from './QueryEditor';
import PlayButton from './PlayButton';
import Accordeon from './Accordeon';
import tabsStore from '../../store/tabsStore';
import JsonEditor from './JsonEditor';
import { Files, editorOptions, resultEditorOptions } from '../../constants/editor';

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
    <div className="flex-auto shadow-md flex flex-col">
      <section className="bg-indigo-50 p-2">
        <PlayButton onClick={handleRequest} />
      </section>
      <section className="flex flex-1">
        <div className="flex-1 border-r-4 border-indigo-50 min-w-0 flex flex-col">
          <div className="flex-1 overflow-hidden pb-3 min-h-0 min-w-0">
            <QueryEditor introspection={schema} />
          </div>
          <Accordeon>
            <>
              <JsonEditor
                type="variables"
                fileName={Files.variables}
                options={editorOptions}
                className={`h-40 ${tabsStore.activeTab === 'variables' ? 'block' : 'hidden'}`}
              />
              <JsonEditor
                type="headers"
                fileName={Files.headers}
                options={editorOptions}
                className={`h-40 ${tabsStore.activeTab === 'headers' ? 'block' : 'hidden'}`}
              />
            </>
          </Accordeon>
        </div>
        <div className="flex-1 min-w-0 min-h-0 pb-3">
          <JsonEditor
            type="result"
            options={resultEditorOptions}
            fileName={Files.result}
            className="h-full"
          />
        </div>
      </section>
    </div>
  );
});

export default GraphQLEditor;
