import Button from '@components/Button';
import useMutation from '@hooks/useMutation';
import useUserStore from '@zustand/useUserStore';
import { useState } from 'react';

export default function ReplyInput({ postId, refetch }) {
  const [content, setContent] = useState('');
  const User = useUserStore();
  const token = User.token?.accessToken;
  const { send } = useMutation(`/posts/${postId}/replies`, {
    method: 'POST',
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await send({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      refetch();
    } catch (err) {
      // TODO: 에러 처리
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          {/* 에러 메세지 출력 */}
          {/*
          <p className="ml-2 mt-1 text-sm text-red-500">
            에러 메세지
          </p>
          */}
        </div>
        <Button type="submit" size="sm" otherOpts="px-4">
          댓글 등록
        </Button>
      </form>
    </div>
  );
}
