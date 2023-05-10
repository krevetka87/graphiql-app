import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IntrospectionQuery } from 'graphql';
import getApiSchema from '../../api/schemaApi';
import { copyQuery, handleRequest, prettifyQuery } from '../../utils/editorHelpers';
import QueryEditor from './QueryEditor';
import Accordeon from './Accordeon';
import tabsStore from '../../store/tabsStore';
import JsonEditor from './JsonEditor';
import { Files, editorOptions, resultEditorOptions } from '../../constants/editor';
import Spinner from '../UI/Spinner';
import EditorButton from './EditorButton';
import PlayIcon from './EditorButton/PlayIcon';
import PrettifyIcon from './EditorButton/PrettifyIcon';
import CopyIcon from './EditorButton/CopyIcon';

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
      <section className="bg-indigo-50 p-2 flex gap-3">
        <EditorButton
          onClick={sendRequest}
          tooltip="execute query"
          className="bg-indigo-600"
          name="execute"
        >
          <PlayIcon />
        </EditorButton>
        <EditorButton
          onClick={prettifyQuery}
          tooltip="prettify query"
          className="hover:bg-slate-200 duration-500 ease-in-out"
          name="prettify"
        >
          <PrettifyIcon />
        </EditorButton>
        <EditorButton
          onClick={copyQuery}
          tooltip="copy query"
          className="hover:bg-slate-200 duration-500 ease-in-out"
          name="copy"
        >
          <CopyIcon />
        </EditorButton>
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
              <Spinner />
            </div>
          )}
        </div>
      </section>
    </div>
  );
});

export default GraphQLEditor;
