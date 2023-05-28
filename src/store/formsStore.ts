import { makeAutoObservable } from 'mobx';

class Forms {
  isSignUp = false;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleIsSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  setIsSignUp(value: boolean) {
    this.isSignUp = value;
  }

  toggleIsLoading() {
    this.isLoading = !this.isLoading;
  }
}

const formsStore = new Forms();

export { formsStore };
