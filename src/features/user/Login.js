import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { themeChange } from 'theme-change'

function Login() {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("light"))

    useEffect(() => {
        themeChange(false);
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        setCurrentTheme("light");
    }, []);

    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.emailId.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        else {
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("token", "DumyTokenHere")
            setLoading(false)
            window.location.href = '/app/dashboard'
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-white-200 flex items-center">
            <div className="card mx-auto w-full max-w-2xl ">
                <div className="grid">
                    {/* <div className=''>
                        <LandingIntro />
                </div> */}
                    <div className='py-24 px-10'>
                        <div className="flex gap-2 items-center justify-center">
                            <div className="w-36">
                                <img src="image/logo.png" alt="" />
                            </div>
                            <div className="grid text-[#E5261D] justify-center text-center">
                                <h2 className='text-7xl font-bold'>Schaffner</h2>
                                <p>MORE POWER TO YOU</p>
                            </div>

                        </div>
                        <form onSubmit={(e) => submitForm(e)} className='max-w-sm mx-auto'>

                            <div className="mb-4">

                                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login