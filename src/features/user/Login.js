import { useState, useEffect } from 'react';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import { themeChange } from 'theme-change';
import { login as loginApi } from '../../services/authService';

function Login() {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('light'));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState({ emailId: '', password: '' });

  useEffect(() => {
    themeChange(false);
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    setCurrentTheme('light');
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (loginObj.emailId.trim() === '') return setErrorMessage('Email is required');
    if (loginObj.password.trim() === '') return setErrorMessage('Password is required');

    try {
      setLoading(true);

      const result = await loginApi({
        email: loginObj.emailId,
        password: loginObj.password,
      });

      if (result.token) {
        localStorage.setItem('token', result.token);
      }

      window.location.href = '/app/dashboard';
    } catch (err) {
      setErrorMessage(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-white-200 flex items-center">
      <div className="card mx-auto w-full max-w-2xl">
        <div className="grid">
          <div className="py-24 px-10">
            <div className="flex gap-2 items-center justify-center">
              <div className="grid text-[#E5261D] justify-center text-center">
                <h2 className="text-7xl font-bold">Schaffner</h2>
                <p>MORE POWER TO YOU</p>
              </div>
              <div className="w-36">
                <img src="image/logo.png" alt="" />
              </div>
            </div>

            <form onSubmit={submitForm} className="max-w-sm mx-auto">
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

              <button
                type="submit"
                className={'btn mt-2 w-full btn-primary' + (loading ? ' loading' : '')}
                disabled={loading}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
