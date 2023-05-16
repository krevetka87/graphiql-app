import { observer } from 'mobx-react-lite';
import { Suspense } from 'react';
import Docs from '../../Docs';
import { editorStore } from '../../../store';
import { ReactComponent as Spinner } from '../../../assets/spinner.svg';

const DocsSection = observer(() => {
  const { isDocsVisible } = editorStore;

  return (
    <section className={`flex font-medium text-base h-full ${isDocsVisible ? 'flex-1' : ''}`}>
      {isDocsVisible && (
        <Suspense
          fallback={
            <div className="border-l border-gray-700 p-4">
              <div className="[&>*:first-child]:w-20 [&>*:first-child]:h-20">
                <Spinner />
              </div>
            </div>
          }
        >
          <Docs />
        </Suspense>
      )}
    </section>
  );
});

export default DocsSection;
