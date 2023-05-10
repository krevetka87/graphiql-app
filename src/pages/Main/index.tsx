import { useState } from 'react';
import { ReactComponent as DocActiveIcon } from '../../assets/doc-active.svg';
import { ReactComponent as DocIcon } from '../../assets/doc.svg';
import Docs from '../../components/Docs/Docs';

export default function Main() {
  const [showDoc, setShowDoc] = useState(false);

  const docButtonOnClick = async () => {
    setShowDoc(!showDoc);
  };

  return (
    <div className="h-full font-medium text-base">
      <section className="flex h-full overflow-auto">
        <div className="flex flex-col justify-between py-3 px-2 w-14">
          <button
            type="button"
            onClick={docButtonOnClick}
            className=" hover:bg-gray-300 font-bold rounded-md py-2 text-2xl flex justify-center"
          >
            {showDoc ? <DocActiveIcon /> : <DocIcon />}
          </button>
        </div>
        {showDoc && <Docs />}
      </section>
    </div>
  );
}
