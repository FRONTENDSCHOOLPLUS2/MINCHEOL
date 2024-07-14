import Button from '@components/Button';
import useMutation from '@hooks/useMutation';
import useUserStore from '@zustand/useUserStore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState({});
  const User = useUserStore();
  const navigate = useNavigate();
  const { send } = useMutation('https://api.fesp.shop/users/login', {
    method: 'POST',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, result } = await send({
        body: JSON.stringify(loginInfo),
      });
      if (result.ok) {
        navigate('/');
        setCurrentUserInfo(User, result);
      } else {
        setError({ status, message: result.message });
        if (status == '422') {
          setError((prev) => {
            const validation = {};
            result.errors.forEach((e) => {
              validation[e.path] = e.msg;
            });
            return { ...prev, validation };
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={loginInfo.email}
              onChange={(e) =>
                setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              name="email"
            />
            {/* 입력값 검증 에러 출력 */}
            {error.status === 422 && error.validation.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.validation.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
              }
              name="password"
            />
            {/* 입력값 검증 에러 출력 */}
            {error.status === 422 && error.validation.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.validation.password}
              </p>
            )}
            {/* 로그인 실패 */}
            {/* TODO: layout 변경 일어나지 않게 변경 */}
            {error.status === 403 && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.message}
              </p>
            )}
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Button type="submit">로그인</Button>
            <Link
              to="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function setCurrentUserInfo(store, fetchResult) {
  store.setIsLogin(true);
  store.setName(fetchResult.item.name);
  store.setProfileImage(fetchResult.item.profileImage.path);
  store.setToken({
    accessToken: fetchResult.item.token.accessToken,
    refreshToken: fetchResult.item.token.refreshToken,
  });
  store.setId(fetchResult.item._id);
}
