import GraphQLEditor from '../../components/GraphQLEditor';
import { useState, Suspense } from 'react';
import Spinner from '../../components/Docs/Spinner';
import { ReactComponent as DocActiveIcon } from '../../assets/doc-active.svg';
import { ReactComponent as DocIcon } from '../../assets/doc.svg';

import Docs from '../../components/Docs';

const Main = () => {
  const [showDoc, setShowDoc] = useState(false);

  const docButtonOnClick = async () => {
    setShowDoc(!showDoc);
  };

  return (
    <>
    <section className="flex font-medium text-base h-full">
      <div className="flex flex-col justify-between py-3 px-2 w-14">
        <button
          type="button"
          onClick={docButtonOnClick}
          className=" hover:bg-gray-300 font-bold rounded-md py-2 text-2xl flex justify-center"
        >
          {showDoc ? <DocActiveIcon /> : <DocIcon />}
        </button>
      </div>
      {showDoc && (
        <Suspense
          fallback={
            <div className="border-l border-gray-700 p-4">
              <Spinner />
            </div>
          }
        >
          <Docs />
        </Suspense>
      )}
    </section>
    <GraphQLEditor />
    </>
  );
};

export default Main;
