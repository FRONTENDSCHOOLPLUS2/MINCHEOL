import Pagination from './Pagination';
import PostItem from './PostItem';

export default function PostList({ data }) {
  console.log('data', data);
  const { item: posts } = data;

  return (
    <section className="pt-10">
      <table className="border-collapse w-full table-fixed">
        <colgroup>
          <col className="w-[10%] sm:w-[10%]" />
          <col className="w-[60%] sm:w-[30%]" />
          <col className="w-[30%] sm:w-[15%]" />
          <col className="w-0 sm:w-[10%]" />
          <col className="w-0 sm:w-[10%]" />
          <col className="w-0 sm:w-[25%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-solid border-gray-600">
            <th className="p-2 whitespace-nowrap font-semibold">번호</th>
            <th className="p-2 whitespace-nowrap font-semibold">제목</th>
            <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
            <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
              조회수
            </th>
            <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
              댓글수
            </th>
            <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 로딩 상태 표시 */}
          {/*
                  <tr>
                    <td colSpan="6" className="py-20 text-center">로딩중...</td>
                  </tr>
                */}

          {/* 에러 메세지 출력 */}
          {/*
                  <tr>
                    <td colSpan="6" className="py-20 text-center">에러 메세지</td>
                  </tr>
                */}

          {/* 본문 출력 */}
          {posts.map((post, i) => {
            const postIndex =
              data.pagination.total -
              (i + (data.pagination.page - 1) * data.pagination.limit);
            return <PostItem post={post} index={postIndex} key={post._id} />;
          })}
        </tbody>
      </table>
      <hr />

      {/* 페이지네이션 */}
      <Pagination pageInfo={data.pagination} />
    </section>
  );
}
