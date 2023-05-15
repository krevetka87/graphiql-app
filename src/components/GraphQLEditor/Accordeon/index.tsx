import { MouseEventHandler, useState } from 'react';
import CloseButton from './CloseButton';
import { editorStore } from '../../../store';
import TabButton from './TabButton';

interface AccordeonProps {
  children: JSX.Element;
}

const Accordeon = ({ children }: AccordeonProps) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) {
      return;
    }

    const { name } = e.currentTarget.dataset;

    if (name) {
      editorStore.setActiveTab(name);

      if (!isOpen) {
        setOpen(true);
      }
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="border-[#ECF3FA] border-t-2 py-3">
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
};

export default Accordeon;
