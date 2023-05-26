import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DocActiveIcon } from '../../../../assets/doc-active.svg';
import { ReactComponent as DocIcon } from '../../../../assets/doc.svg';
import { editorStore } from '../../../../store';

const DocsButton = observer(() => {
  const { t } = useTranslation();
  const { isDocsVisible } = editorStore;

  const showDocs = (): void => {
    editorStore.setDocsVisible(!isDocsVisible);
  };

  return (
    <div className="group relative order-1 lg:order-2 mb-12 lg:mb-0">
      <button
        type="button"
        onClick={showDocs}
        className=" hover:bg-gray-300 font-bold rounded-lg p-2 transition-all duration-500 [&>*:first-child]:w-6 [&>*:first-child]:h-6 flex justify-center"
      >
        {isDocsVisible ? <DocActiveIcon /> : <DocIcon />}
      </button>
      <div className="text-xs capitalize invisible opacity-0 duration-500 group-hover:visible group-hover:opacity-100 absolute -bottom-7 left-0 lg:right-0 lg:left-auto bg-white rounded-sm py-1 px-2 shadow-sm z-10 whitespace-nowrap">
        {isDocsVisible ? t('editor.tooltips.docs.hide') : t('editor.tooltips.docs.show')}
      </div>
    </div>
  );
});

export default DocsButton;
