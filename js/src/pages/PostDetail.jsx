import Button from '@components/Button';
import useFetch from '@hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import ReplyList from '../components/ReplyList';
import useMutation from '@hooks/useMutation';
import useUserStore from '@zustand/useUserStore';

export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useFetch(`/posts/${id}`);
  const { send } = useMutation(`/posts/${id}`, { method: 'DELETE' });
  const User = useUserStore();
  const token = User.token?.accessToken;
  const currentUserId = User.id;

  const handleDelete = async () => {
    const check = confirm('게시글을 삭제하시겠습니까?');
    if (!check) return;
    try {
      await send({ headers: { Authorization: `Bearer ${token}` } });
      navigate('/info');
    } catch (error) {
      // TODO: 에러 처리
    }
  };
  const handleEdit = () => {
    navigate(`/info/${id}/edit`, {
      state: {
        title: data.item.title,
        content: data.item.content,
        id,
      },
    });
  };

  return (
    data && (
      <main className="container mx-auto mt-4 px-4">
        <section className="mb-8 p-4">
          <div className="font-semibold text-xl">제목 : {data.item.title}</div>
          <div className="text-right text-gray-400">
            작성자 : {data.item.user.name}
          </div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                {data.item.content}
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Button handleClick={() => navigate(-1)}>목록</Button>
            {currentUserId == data.item.user._id && (
              <>
                <Button bgColor="black" handleClick={handleEdit}>
                  수정
                </Button>
                <Button bgColor="red" handleClick={handleDelete}>
                  삭제
                </Button>
              </>
            )}
          </div>
        </section>

        {/* 댓글 목록 */}
        <ReplyList postId={id} />
      </main>
    )
  );
}
