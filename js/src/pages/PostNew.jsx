import Button from '@components/Button';
import useMutation from '@hooks/useMutation';
import useUserStore from '@zustand/useUserStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostNew() {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });
  const User = useUserStore();
  const token = User.token?.accessToken;
  const { send } = useMutation('/posts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = confirm('글을 등록하시겠습니까?');
    if (!check) return;
    try {
      const result = await send({
        body: JSON.stringify({
          type: 'post',
          title: post.title,
          content: post.content,
        }),
      });
      console.log('result', result);
      navigate(-1);
    } catch (error) {
      // TODO: 에러 처리
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Button type="submit">등록</Button>
            <Button
              type="reset"
              bgColor="black"
              handleClick={() => navigate(-1)}
            >
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
