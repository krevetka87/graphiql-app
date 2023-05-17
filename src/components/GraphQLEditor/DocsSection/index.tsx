import { observer } from 'mobx-react-lite';
import { Suspense } from 'react';
import Docs from '../../Docs';
import { editorStore } from '../../../store';
import { ReactComponent as Spinner } from '../../../assets/spinner.svg';

const DocsSection = observer(() => {
  const { isDocsVisible } = editorStore;

  return (
    <section
      className={`flex font-medium order-1 lg:order-3 text-base transition-all ${
        isDocsVisible
          ? 'lg:flex-1 border-b lg:border-l lg:border-b-0 border-gray-700 h-[300px] lg:h-full'
          : ''
      }`}
    >
      {isDocsVisible && (
        <Suspense
          fallback={
            <div className="[&>*:first-child]:w-24 [&>*:first-child]:h-24 p-4 w-full h-full flex justify-center items-center">
              <Spinner />
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
