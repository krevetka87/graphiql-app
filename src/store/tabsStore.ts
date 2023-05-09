import { observable } from 'mobx';

interface ITabsStore {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const tabsStore: ITabsStore = {
  activeTab: 'variables',

  setActiveTab(value) {
    this.activeTab = value;
  },
};

export default observable(tabsStore);
