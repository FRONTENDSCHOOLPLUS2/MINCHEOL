import Button from '@components/Button';
import useMutation from '@hooks/useMutation';
import useUserStore from '@zustand/useUserStore';

export default function ReplyItem({ data, postId, refetch }) {
  const user = data?.user;
  const User = useUserStore();
  const token = User.token?.accessToken;
  const currentUserId = User.id;
  const isReplyWriter = currentUserId == user._id;
  const { send } = useMutation(`/posts/${postId}/replies/${data._id}`, {
    method: 'DELETE',
  });
  const handleDelete = async () => {
    const check = confirm('댓글을 삭제하시겠습니까?');
    if (check) {
      await send({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
    }
  };
  return (
    data && (
      <div className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <img
            className="w-8 mr-2 rounded-full"
            src={'https://api.fesp.shop' + user.profile.path}
            alt={user.profile.originalname}
          />
          <a href="" className="text-orange-400">
            {user.name}
          </a>
          <time className="ml-auto text-gray-500" dateTime={data.createdAt}>
            {data.createdAt}
          </time>
        </div>
        <div className="flex justify-between items-center mb-2">
          <pre className="whitespace-pre-wrap text-sm">{data.content}</pre>
          {isReplyWriter && (
            <Button
              handleClick={handleDelete}
              bgColor="red"
              size="sm"
              otherOpts="px-4"
            >
              삭제
            </Button>
          )}
        </div>
      </div>
    )
  );
}
