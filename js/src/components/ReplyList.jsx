import useFetch from '@hooks/useFetch';
import ReplyItem from './ReplyItem';
import ReplyInput from './ReplyInput';

export default function ReplyList({ postId }) {
  const { data, refetch } = useFetch(`/posts/${postId}/replies`);

  return (
    data && (
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 {data.item.length}개</h4>
        {/* 댓글 */}
        {data?.item.map((reply) => (
          <ReplyItem
            data={reply}
            postId={postId}
            refetch={refetch}
            key={reply['_id']}
          />
        ))}
        {/* 댓글 입력 */}
        <ReplyInput postId={postId} refetch={refetch} />
      </section>
    )
  );
}
