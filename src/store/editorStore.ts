import { makeAutoObservable } from 'mobx';
import { EditorTypes } from '../types/editor.types';
import { initValues } from '../constants/editor';

class EditorStore {
  values: EditorTypes = initValues;

  activeTab = 'variables';

  isDocsVisible = false;

  isDataLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setValue(value: string, type: keyof EditorTypes) {
    this.values[type] = value;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  setDocsVisible(value: boolean) {
    this.isDocsVisible = value;
  }

  setDataLoading(value: boolean) {
    this.isDataLoading = value;
  }
}

export default EditorStore;
