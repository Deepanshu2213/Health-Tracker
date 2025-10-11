import type { FC } from 'react';
import { useRef, useState } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin } from 'react-icons/fa';
import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store';
import type { LoginArgs } from '../store';
import type { loginDispatch } from '../store';
import { createUser } from '../store';
import { getGooleAuthUrl } from '../utils/utiltiy';

const iconsList = (): ReactNode[] => {
  return [
    <FaFacebook key={1} />,
    <FaTwitter key={2} />,
    <FaLinkedin key={3} />,
  ];
};
const Login: FC = () => {
  return (
    <div className="flex min-h-screen min-w-screen overflow-y-auto">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

const LeftPanel: FC = () => {
  return <div className="flex-1 h-full"></div>;
};
const RightPanel: FC = () => {
  return (
    <div className="flex-1 h-full flex flex-col justify-center items-center bg-gray-100 text-gray-700 font-medium">
      <div className="w-full h-full content-center">
        <AuthLoginCont />
      </div>
    </div>
  );
};
const AuthLoginCont: FC = () => {
  const [login, setLogin] = useState<boolean>(true);
  const loginToggle = () => {
    setLogin((prev) => !prev);
  };
  const dispatch = useDispatch<loginDispatch>();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const processLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    const nameVal = name.current?.value;
    const passVal = password.current?.value;
    const emailVal = email.current?.value;
    const payload: LoginArgs = {
      name: nameVal,
      password: passVal,
      email: emailVal,
    };
    login ? dispatch(loginUser(payload)) : dispatch(createUser(payload));
    e.preventDefault();
  };
  const inputCls = 'flex flex-col';
  return (
    <div className="flex flex-col m-[4rem] justify-evenly">
      <div className="flex-1 justify-items-center text-center mb-[2rem]">
        <h1 className="mb-[1rem]">{`${
          login ? 'Login' : 'Create '
        } an account`}</h1>
        <button className="w-full rounded-md flex items-center justify-center gap-3 border-3 p-[1rem] border-gray-300">
          {<a href={getGooleAuthUrl()}>Login account with google</a>}
          <FaGoogle />
        </button>
      </div>
      <div className="flex items-center w-full my-[2rem]">
        <div className="flex-1 border-b-2 border-gray-300"></div>
        <p className="mx-4 text-gray-600">OR</p>
        <div className="flex-1 border-b-2 border-gray-300"></div>
      </div>
      <form
        className="flex flex-col flex-1 gap-[1rem] w-full"
        onSubmit={processLogin}
      >
        <div className={inputCls}>
          <label htmlFor="userEmail" className="pb-[0vh]">
            Email
          </label>
          <input
            type="email"
            ref={email}
            id="userEmail"
            name="email"
            required
            placeholder="Enter your email"
            className="p-2 border-3 border-gray-300"
          />
        </div>
        <div className={inputCls + `${login ? ' hidden' : ''}`}>
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            id="fullName"
            ref={name}
            name="name"
            required={!login}
            placeholder="Enter your Name"
            className="p-2 border-3 border-gray-300"
          />
        </div>
        <div className={inputCls}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            id="password"
            ref={password}
            className={`p-2 border-3 border-gray-300`}
            placeholder="Enter your Password"
          />
        </div>
        <div className="flex-1 justify-items-center text-center mt-[2rem] flex flex-col gap-4">
          <button className="w-full rounded-full bg-violet-500 p-[1rem] text-white">
            {login ? 'Login' : 'Create an account'}
          </button>
          <p>
            {`${login ? 'Dont' : 'Already'} have an account  `}
            <a
              className="border-b-2 border-gray-900"
              href="#"
              onClick={loginToggle}
            >
              {login ? 'create' : 'Login'}
            </a>
          </p>
          <div className="flex justify-center text-2xl gap-4">
            {iconsList()?.map((ele) => ele)}
          </div>
        </div>
      </form>
    </div>
  );
};
export default wrappedComponent(Login, { light: true, screen: true });
