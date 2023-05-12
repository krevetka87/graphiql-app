import { observer } from 'mobx-react-lite';
import { MouseEventHandler } from 'react';
import tabsStore from '../../../../store/tabsStore';

interface ITabButton {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const TabButton = observer(({ name, onClick, isOpen }: ITabButton) => {
  const { activeTab } = tabsStore;
  return (
    <button
      type="button"
      data-name={name}
      onClick={onClick}
      className={`p-2 font-semibold rounded-md transition-all duration-500 ease-in-out mr-2 ${
        isOpen && activeTab === name ? 'bg-gray-50 cursor-default' : ''
      }`}
    >
      <span className="capitalize">{name}</span>
    </button>
  );
});

export default TabButton;
