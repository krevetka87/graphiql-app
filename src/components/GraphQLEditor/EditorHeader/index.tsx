import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { TooltipNames } from '../../../constants/editor';
import { copyQuery, handleRequest, prettifyQuery } from '../../../utils/editorHelpers';
import ActionButton from '../ActionButton';
import { ReactComponent as CopyIcon } from '../../../assets/copy.svg';
import { ReactComponent as FormatIcon } from '../../../assets/format.svg';
import { ReactComponent as PlayIcon } from '../../../assets/play.svg';
import { editorStore } from '../../../store';
import DocsButton from '../DocsButton/Index';

const EditorHeader = () => {
  const { t } = useTranslation();

  const sendRequest = (): void => {
    editorStore.setDataLoading(true);

    handleRequest()
      .catch((err: Error) => toast.error(err.message))
      .finally(() => editorStore.setDataLoading(false));
  };

  return (
    <div className="p-2 flex justify-between items-center border-b-2 border-[#ECF3FA]">
      <div className="flex gap-3">
        <ActionButton
          onClick={sendRequest}
          tooltip={t('editor.tooltips.execute')}
          name={TooltipNames.execute}
        >
          <PlayIcon />
        </ActionButton>
        <ActionButton
          onClick={prettifyQuery}
          tooltip={t('editor.tooltips.format')}
          name={TooltipNames.format}
        >
          <FormatIcon />
        </ActionButton>
        <ActionButton
          onClick={copyQuery}
          tooltip={t('editor.tooltips.copy')}
          name={TooltipNames.copy}
        >
          <CopyIcon />
        </ActionButton>
      </div>
      <DocsButton />
    </div>
  );
};

export default EditorHeader;
