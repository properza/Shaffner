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

    // const submitForm = (e) => {
    //     e.preventDefault()
    //     setErrorMessage("")

    //     if (loginObj.emailId.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
    //     if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
    //     else {
    //         setLoading(true)
    //         // Call API to check user credentials and save token in localstorage
    //         localStorage.setItem("token", "DumyTokenHere")
    //         setLoading(false)
    //         window.location.href = '/app/dashboard'
    //     }
    // }

    // const updateFormValue = ({ updateType, value }) => {
    //     setErrorMessage("")
    //     setLoginObj({ ...loginObj, [updateType]: value })
    // }

    return (
        <div className="min-h-screen bg-white-200 flex items-center">
            <div className="card mx-auto w-full max-w-2xl ">
                <div className="grid">
                    {/* <div className=''>
                        <LandingIntro />
                </div> */}
                    <div className='py-24 px-10'>
                        <div className="flex gap-2 items-center justify-center">
                            <div className="grid text-[#E5261D] justify-center text-center">
                                <h2 className='text-7xl font-bold'>Schaffner</h2>
                                <p>MORE POWER TO YOU</p>
                            </div>
                            <div className="w-36">
                                <img src="image/logo.png" alt="" />
                            </div>

                        </div>
                        <form onSubmit={(e) => submitForm(e)} className='max-w-sm mx-auto'>

                            <div className="mb-4">

                                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary"}>
                                {loading ?
                                    <div className="flex gap-1 items-center">
                                        loading <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                    :
                                    <p>Login</p>}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            {/* <form onSubmit={submitForm} className="max-w-sm mx-auto">
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
      </form> */}
        </div>
    );
}

export default Login;
