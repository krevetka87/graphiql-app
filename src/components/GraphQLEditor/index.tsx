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
  const [isSchemaLoading, setSchemaLoading] = useState<boolean>(false);
  const [schemaError, setSchemaError] = useState<string>('');
  const [isDataLoading, setDataLoading] = useState<boolean>(false);

  const { activeTab } = tabsStore;

  const sendRequest = (): void => {
    setDataLoading(true);

    handleRequest()
      .catch((err: Error) => console.log(err.message))
      .finally(() => setDataLoading(false));
  };

  useEffect(() => {
    if (schema) {
      return;
    }
    setSchemaLoading(true);

    getApiSchema()
      .then((data) => {
        setSchema(data);
      })
      .catch((err: Error) => setSchemaError(err.message))
      .finally(() => setSchemaLoading(false));
  }, [schema]);

  return (
    <div className="shadow-lg flex flex-col mx-5 flex-auto mt-10">
      <section className="p-2 flex justify-between bg-gray-100">
        <div className="flex gap-3">
          <EditorButton onClick={sendRequest} tooltip="execute query" name="execute">
            <PlayIcon />
          </EditorButton>
          <EditorButton onClick={prettifyQuery} tooltip="prettify query" name="prettify">
            <PrettifyIcon />
          </EditorButton>
          <EditorButton onClick={copyQuery} tooltip="copy query" name="copy">
            <CopyIcon />
          </EditorButton>
        </div>
        <div className="" />
      </section>
      <section className="flex flex-1">
        <div className="flex-1 border-r-2 border-gray-100 min-w-0 flex flex-col">
          <div className="flex-1 min-h-0 min-w-0">
            <QueryEditor schema={schema} />
          </div>
          <Accordeon>
            <>
              <JsonEditor
                type="variables"
                fileName={Files.variables}
                options={editorOptions}
                className={`h-40 ${activeTab === 'variables' ? 'block' : 'hidden'}`}
              />
              <JsonEditor
                type="headers"
                fileName={Files.headers}
                options={editorOptions}
                className={`h-40 ${activeTab === 'headers' ? 'block' : 'hidden'}`}
              />
            </>
          </Accordeon>
        </div>
        <div className="flex-1 min-w-0 min-h-0 py-3 px-3">
          {!isDataLoading ? (
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
