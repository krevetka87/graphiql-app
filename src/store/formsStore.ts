import { observable } from 'mobx';

interface FormsStore {
  isSignUp: boolean;
  isLoading: boolean;
  toggleIsSignUp: () => void;
  setIsSignUp: (value: boolean) => void;
  toggleIsLoading: () => void;
}

const forms: FormsStore = {
  isSignUp: false,
  isLoading: false,
  toggleIsSignUp() {
    this.isSignUp = !this.isSignUp;
  },
  setIsSignUp(value) {
    this.isSignUp = value;
  },
  toggleIsLoading() {
    this.isLoading = !this.isLoading;
  },
};

const formsStore = observable(forms);

export { formsStore };
