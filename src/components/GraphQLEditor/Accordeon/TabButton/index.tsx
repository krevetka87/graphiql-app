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
      className={`p-2 font-semibold rounded-md transition-all duration-500 ease-in-out mr-2 ${
        isOpen && activeTab === name ? 'bg-[#ECF3FA] cursor-default text-[#4A3A8A]' : ''
      }`}
    >
      <span className="capitalize">{title}</span>
    </button>
  );
});

export default TabButton;
