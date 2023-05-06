import { observable } from 'mobx';

interface FormsStore {
  isSignUp: boolean;
  toggleIsSignUp: () => void;
  setIsSignUp: (value: boolean) => void;
}

const forms: FormsStore = {
  isSignUp: false,
  toggleIsSignUp() {
    this.isSignUp = !this.isSignUp;
  },
  setIsSignUp(value) {
    this.isSignUp = value;
  },
};

const formsStore = observable(forms);

export { formsStore };
