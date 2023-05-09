import { observer } from 'mobx-react-lite';
import { MouseEventHandler } from 'react';
import tabsStore from '../../../../store/tabsStore';

interface ITabButton {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const TabButton = observer(({ name, onClick, isOpen }: ITabButton) => {
  return (
    <button
      type="button"
      data-name={name}
      onClick={onClick}
      className={`p-2 hover:text-indigo-600 rounded-md transition-all duration-500 ease-in-out mr-2 ${
        isOpen && tabsStore.activeTab === name ? 'bg-indigo-50 text-indigo-600 cursor-default' : ''
      }`}
    >
      <span className="capitalize">{name}</span>
    </button>
  );
});

export default TabButton;
