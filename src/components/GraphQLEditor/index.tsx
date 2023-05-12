import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import getApiSchema from '../../api/schemaApi';
import { copyQuery, handleRequest, prettifyQuery } from '../../utils/editorHelpers';
import QueryEditor from './QueryEditor';
import Accordeon from './Accordeon';
import JsonEditor from './JsonEditor';
import {
  Files,
  Tabs,
  TooltipNames,
  editorOptions,
  resultEditorOptions,
} from '../../constants/editor';
import Spinner from '../UI/Spinner';
import EditorButton from './EditorButton';
import PlayIcon from './EditorButton/PlayIcon';
import PrettifyIcon from './EditorButton/PrettifyIcon';
import CopyIcon from './EditorButton/CopyIcon';
import editorStore from '../../store/editorStore';

const GraphQLEditor = observer(() => {
  const { t } = useTranslation();
  const [isDataLoading, setDataLoading] = useState(false);
  const { schema, activeTab } = editorStore;

  const sendRequest = (): void => {
    setDataLoading(true);

    handleRequest()
      .catch((err: Error) => toast.error(err.message))
      .finally(() => setDataLoading(false));
  };

  useEffect(() => {
    if (schema) {
      return;
    }

    getApiSchema()
      .then((data) => {
        editorStore.setSchema(data);
      })
      .catch((err: Error) => toast.error(err.message));
  }, [schema]);

  return (
    <div className="shadow-lg flex flex-col mx-5 flex-auto mt-10">
      <section className="p-2 flex justify-between border-b-2 border-[#ECF3FA]">
        <div className="flex gap-3">
          <EditorButton
            onClick={sendRequest}
            tooltip={t('editor.tooltips.execute')}
            name={TooltipNames.execute}
          >
            <PlayIcon />
          </EditorButton>
          <EditorButton
            onClick={prettifyQuery}
            tooltip={t('editor.tooltips.format')}
            name={TooltipNames.format}
          >
            <PrettifyIcon />
          </EditorButton>
          <EditorButton
            onClick={copyQuery}
            tooltip={t('editor.tooltips.copy')}
            name={TooltipNames.copy}
          >
            <CopyIcon />
          </EditorButton>
        </div>
      </section>
      <section className="flex flex-1">
        <div className="flex-1 border-r-4 border-[#ECF3FA] min-w-0 flex flex-col">
          <div className="flex-1 min-h-0 min-w-0">
            <QueryEditor />
          </div>
          <Accordeon>
            <>
              <JsonEditor
                type={Tabs.variables}
                fileName={Files.variables}
                options={editorOptions}
                className={`h-40 ${activeTab === Tabs.variables ? 'block' : 'hidden'}`}
              />
              <JsonEditor
                type={Tabs.headers}
                fileName={Files.headers}
                options={editorOptions}
                className={`h-40 ${activeTab === Tabs.headers ? 'block' : 'hidden'}`}
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
