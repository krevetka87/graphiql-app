import { observer } from 'mobx-react-lite';
import { MouseEventHandler } from 'react';
import { editorStore } from '../../../../store';

interface TabButtonProps {
  name: string;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const TabButton = observer(({ name, onClick, isOpen, title }: TabButtonProps) => {
  const { activeTab } = editorStore;

  return (
    <button
      type="button"
      data-name={name}
      onClick={onClick}
      className={`p-1 md:p-2 text-[12px] md:text-base font-semibold rounded-md transition-all duration-500 ease-in-out ${
        isOpen && activeTab === name ? 'bg-[#ECF3FA] cursor-default text-[#fe718d]' : ''
      }`}
    >
      <span className="capitalize">{title}</span>
    </button>
  );
});

export default TabButton;
