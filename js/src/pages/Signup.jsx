import Button from '@components/Button';
import useMutation from '@hooks/useMutation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { send: formSend } = useMutation('/users/', {
    method: 'POST',
  });
  const { send: imgSend } = useMutation('/files/', {
    method: 'POST',
  });
  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      setImg(e.target.files[0]);
      return;
    }
    setSignupInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const profileImage = await getProfileImage();
      const submitResult = await formSend({
        body: JSON.stringify({
          ...signupInfo,
          profileImage,
          type: 'user',
        }),
      });
      const { status, result } = submitResult;
      if (!result.ok) {
        setError({ status, message: result.message });
        if (status === 422) {
          setError((prev) => {
            const validation = {};
            result.errors.forEach((e) => {
              validation[e.path] = e.msg;
            });

            return { ...prev, validation };
          });
        }
      } else {
        navigate('/');
        setError(null);
      }
      // navigate(-1);
    } catch (err) {
      // TODO: 에러 처리
      console.error('signup', err);
    } finally {
      setIsLoading(false);
    }
  };
  const getProfileImage = async () => {
    const formData = new FormData();
    formData.append('attach', img);

    const {
      result: { item },
    } = await imgSend({
      headers: {},
      body: formData,
    });

    return item[0];
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            {/* 입력값 검증 에러 출력 */}
            {error?.validation?.name && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.validation.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {/* 입력값 검증 에러 출력 */}
            {error?.validation?.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.validation.email}
              </p>
            )}
            {error?.status === 409 && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.message}
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
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            {/* 입력값 검증 에러 출력 */}
            {error?.validation?.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {error.validation.password}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Button type="submit" otherOpts="px-4" disabled={isLoading}>
              회원가입
            </Button>
            <Button
              bgColor="black"
              type="reset"
              otherOpts="px-4"
              handleClick={() => navigate(-1)}
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
