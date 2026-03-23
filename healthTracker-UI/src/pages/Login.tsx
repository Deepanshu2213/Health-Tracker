import type { FC } from 'react';
import { useEffect, useState } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin } from 'react-icons/fa';
import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store';
import type { loginDispatch } from '../store';
import { createUser } from '../store';
import { getGooleAuthUrl } from '../utils/utiltiy';
import { useResizeContext } from '../hooks/useResizeContext';
import { LoginForm, type LoginFormType } from '../schemas/loginForm';

const iconsList = (): ReactNode[] => {
  return [
    <FaFacebook key={1} />,
    <FaTwitter key={2} />,
    <FaLinkedin key={3} />,
  ];
};
const Login: FC = () => {
  const { width } = useResizeContext();
  console.log(width);
  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden">
      {width > 700 || !width ? <LeftPanel /> : ''}
      <RightPanel />
    </div>
  );
};

const LeftPanel: FC = () => {
  return (
    <div className="flex-1 h-full relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-neutral-950">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
      <div className="absolute bottom-16 left-16 right-16 text-white text-left">
        <h1 className="text-5xl font-bold mb-6 tracking-tight leading-tight">Unlock Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Potential</span></h1>
        <p className="text-xl text-neutral-300 font-light max-w-md">Track workouts, analyze progress, and achieve your physical goals with real-time insights.</p>
      </div>
    </div>
  );
};
const RightPanel: FC = () => {
  return (
    <div className="flex-1 h-full flex flex-col justify-center items-center bg-neutral-950 text-neutral-200 font-medium relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_40%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.15),transparent_40%)] pointer-events-none"></div>
      <div className="w-full h-full content-center z-10">
        <AuthLoginCont />
      </div>
    </div>
  );
};
const AuthLoginCont: FC = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [errors, setErrors] = useState<Map<string, string[]>>(new Map());
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: '',
    password: '',
    name: '',
  });
  const loginToggle = () => {
    setLogin((prev) => !prev);
  };
  const isValidForValidation = (): boolean => {
    Object.entries(loginForm).forEach(([key, value]) => {
      if (value) {
        return true;
      }
    });
    return false;
  }
  const validateInput = () => {
    const result = LoginForm.safeParse(loginForm);
    if (!isValidForValidation()) return;
    if (!result.success) {
      const map = new Map<string, string[]>();
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;
        if (!map.has(field)) {
          map.set(field, []);
        }
        map.get(field)?.push(message);
      });
      setErrors(map);
      return;
    }
    setErrors(new Map());
  };
  useEffect(() => {
    validateInput();
  }, [loginForm]);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const errorElement = (key: string): ReactNode[] => {
    return (
      errors
        .get(key)
        ?.map((issue) => <p className="text-red-500">{issue}</p>) || []
    );
  };
  const { width } = useResizeContext();
  const dispatch = useDispatch<loginDispatch>();
  const processLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    login ? dispatch(loginUser(loginForm)) : dispatch(createUser(loginForm));
    e.preventDefault();
  };
  const inputCls = 'flex flex-col';
  return (
    <div
      className={`flex flex-col backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-6 sm:px-8 sm:py-6 ${width <= 450 ? 'm-2' : 'max-w-md mx-auto my-2'
        } justify-evenly relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex-1 justify-items-center text-center mb-4 z-10">
        <h1 className="text-2xl font-light tracking-wide mb-3">{`${login ? 'Welcome Back' : 'Join Us'
          }`}</h1>
        <button
          className={`w-full rounded-xl flex items-center justify-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors py-2 px-4 shadow-lg ${width <= 900 ? 'text-base' : ''
            }`}
        >
          {<a href={getGooleAuthUrl()}>Login account with google</a>}
          <FaGoogle />
        </button>
      </div>
      <div className={`flex items-center w-full z-10 ${login ? 'my-4' : 'my-3'}`}>
        <div className="flex-1 border-b border-white/10"></div>
        <p className="mx-4 text-neutral-400 font-light text-sm">OR</p>
        <div className="flex-1 border-b border-white/10"></div>
      </div>
      <form
        className="flex flex-col flex-1 gap-3 w-full z-10"
        onSubmit={processLogin}
      >
        <div className={inputCls}>
          <label htmlFor="userEmail" className="pb-1 text-sm text-neutral-300">
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="email"
            onChange={onInputChange}
            value={loginForm.email}
            required
            placeholder="Enter your email"
            className="py-2.5 px-3 bg-neutral-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-neutral-500"
          />
          {errorElement('email')}
        </div>
        <div className={inputCls + `${login ? ' hidden' : ''}`}>
          <label htmlFor="fullName" className="pb-1 text-sm text-neutral-300">Name</label>
          <input
            type="text"
            id="fullName"
            name="name"
            required={!login}
            onChange={onInputChange}
            value={loginForm.name}
            placeholder="Enter your Name"
            className="py-2.5 px-3 bg-neutral-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-neutral-500"
          />
          {errorElement('fullName')}
        </div>
        <div className={inputCls}>
          <label htmlFor="password" className="pb-1 text-sm text-neutral-300">Password</label>
          <input
            type="password"
            name="password"
            required
            id="password"
            onChange={onInputChange}
            value={loginForm.password}
            className="py-2.5 px-3 bg-neutral-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-neutral-500"
            placeholder="Enter your Password"
          />
          {errorElement('password')}
        </div>
        <div className="flex-1 justify-items-center text-center mt-3 flex flex-col gap-3">
          <button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-2.5 px-4 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
            {login ? 'Sign In' : 'Create Account'}
          </button>
          <p className="text-neutral-400 text-sm">
            {`${login ? "Don't" : 'Already'} have an account? `}
            <a
              className="text-violet-400 hover:text-fuchsia-400 transition-colors font-medium cursor-pointer"
              href="#"
              onClick={loginToggle}
            >
              {login ? 'Sign up' : 'Log in'}
            </a>
          </p>
          <div className="flex justify-center text-2xl gap-6 mt-2 text-neutral-400">
            {iconsList()?.map((ele, idx) => (
              <span key={idx} className="hover:text-violet-400 cursor-pointer transition-colors hover:scale-110 transform duration-200">
                {ele}
              </span>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
export default wrappedComponent(Login, { light: true, screen: true });
