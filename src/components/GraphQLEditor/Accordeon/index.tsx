import { MouseEventHandler, useState } from 'react';
import CloseButton from './CloseButton';
import tabsStore from '../../../store/tabsStore';

interface IAccordeonProps {
  children: JSX.Element;
}

function Accordeon({ children }: IAccordeonProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) {
      return;
    }

    const { name } = e.currentTarget.dataset;

    if (name) {
      tabsStore.setActiveTab(name);

      if (!isOpen) {
        setOpen(true);
      }
    } else {
      tabsStore.setActiveTab('variables');
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="border-indigo-50 border-t-2 py-3">
      <div className="px-6 text-left items-center flex justify-between">
        <div className="flex">
          <button
            type="button"
            data-name="variables"
            onClick={handleClick}
            className={`p-2 hover:text-indigo-600 rounded-md transition-all duration-500 ease-in-out mr-2 ${
              isOpen && tabsStore.activeTab === 'variables' ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            Variables
          </button>
          <button
            type="button"
            data-name="headers"
            onClick={handleClick}
            className={`p-2 hover:text-indigo-600 rounded-md transition-all duration-500 ease-in-out ${
              isOpen && tabsStore.activeTab === 'headers' ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            Headers
          </button>
        </div>
        <CloseButton isOpen={isOpen} onClick={handleClick} />
      </div>
      <div
        className={`px-0 pt-0 overflow-hidden transition-all duration-500 ease-in ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordeon;
