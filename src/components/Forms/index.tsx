import { SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { FormValues } from 'src/types/forms.types';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from 'src/firebase';
import { formsStore } from 'src/store/formsStore';
import AuthForm from './AuthForm';

const Forms = observer(() => {
  const { isSignUp } = formsStore;

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    formsStore.toggleIsLoading();
    if (!isSignUp) {
      await loginWithEmailAndPassword(email, password);
    } else {
      await registerWithEmailAndPassword(email, password);
    }
    formsStore.toggleIsLoading();
  };

  return <AuthForm onSubmit={handleSubmit} />;
});

export default Forms;
