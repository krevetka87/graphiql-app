import { observer } from 'mobx-react-lite';
import { ReactComponent as DocActiveIcon } from '../../../assets/doc-active.svg';
import { ReactComponent as DocIcon } from '../../../assets/doc.svg';
import { editorStore } from '../../../store';

const DocsButton = observer(() => {
  const { isDocsVisible } = editorStore;

  const showDocs = (): void => {
    editorStore.setDocsVisible(!isDocsVisible);
  };

  return (
    <button
      type="button"
      onClick={showDocs}
      className=" hover:bg-gray-300 font-bold rounded-lg p-2 [&>*:first-child]:w-6 [&>*:first-child]:h-6 flex justify-center"
    >
      {isDocsVisible ? <DocActiveIcon /> : <DocIcon />}
    </button>
  );
});

export default DocsButton;
