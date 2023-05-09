import { MouseEventHandler, useState } from 'react';
import CloseButton from './CloseButton';
import tabsStore from '../../../store/tabsStore';
import TabButton from './TabButton';

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
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="border-indigo-50 border-t-2 py-3 min-h-1/5">
      <div className="px-6 text-left items-center flex justify-between">
        <div className="flex">
          <TabButton onClick={handleClick} isOpen={isOpen} name="variables" />
          <TabButton onClick={handleClick} isOpen={isOpen} name="headers" />
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
