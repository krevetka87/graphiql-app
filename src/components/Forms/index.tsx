import { SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { FormValues } from '../../types/forms.types';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '../../firebase';
import { formsStore } from '../../store/formsStore';
import AuthForm from './AuthForm';

const Forms = observer(() => {
  const { isSignUp } = formsStore;

  const handleLoginSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    await loginWithEmailAndPassword(email, password);
  };

  const handleRegisterSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    await registerWithEmailAndPassword(email, password);
  };

  return <AuthForm onSubmit={!isSignUp ? handleLoginSubmit : handleRegisterSubmit} />;
});

export default Forms;
