import { observer } from 'mobx-react-lite';
import { Files, resultEditorOptions } from '../../../constants/editor';
import JsonEditor from '../JsonEditor';
import { editorStore } from '../../../store';
import { ReactComponent as Spinner } from '../../../assets/spinner.svg';

const ResponseSection = observer(() => {
  const { isDataLoading } = editorStore;

  return (
    <section className="flex-1 min-w-0 min-h-0 py-3 px-3">
      {!isDataLoading ? (
        <JsonEditor
          type="result"
          options={resultEditorOptions}
          fileName={Files.result}
          className="h-[98%]"
        />
      ) : (
        <div className="h-full flex items-center justify-center [&>*:first-child]:w-20 [&>*:first-child]:h-20">
          <Spinner />
        </div>
      )}
    </section>
  );
});

export default ResponseSection;
