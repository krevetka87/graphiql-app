import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IntrospectionQuery } from 'graphql';
import getApiSchema from '../../api/schemaApi';
import { handleRequest } from '../../utils/editorHelpers';
import QueryEditor from './QueryEditor';
import PlayButton from './QueryEditor/PlayButton';
import Accordeon from './Accordeon';
import tabsStore from '../../store/tabsStore';
import JsonEditor from './JsonEditor';
import { Files, editorOptions, resultEditorOptions } from '../../constants/editor';
import Spinner from '../UI/Spinner';

const GraphQLEditor = observer(() => {
  const [schema, setSchema] = useState<IntrospectionQuery | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const sendRequest = async (): Promise<void> => {
    setLoading(true);
    await handleRequest();
    setLoading(false);
  };

  useEffect(() => {
    if (schema) {
      return;
    }
    getApiSchema().then((data) => {
      setSchema(data);
    });
  }, [schema]);

  return (
    <div className="shadow-md flex flex-col mx-5 flex-auto">
      <section className="bg-indigo-50 p-2">
        <PlayButton onClick={sendRequest} />
      </section>
      <section className="flex flex-1">
        <div className="flex-1 border-r-4 border-indigo-50 min-w-0 flex flex-col">
          <div className="flex-1 min-h-0 min-w-0">
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
        <div className="flex-1 min-w-0 min-h-0 py-3 px-3">
          {!isLoading ? (
            <JsonEditor
              type="result"
              options={resultEditorOptions}
              fileName={Files.result}
              className="h-[98%]"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <Spinner bgColor="indigo-100" fillColor="indigo-500" width="12" height="12" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
});

export default GraphQLEditor;
