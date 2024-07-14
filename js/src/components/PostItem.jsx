import { useNavigate } from 'react-router-dom';

export default function PostItem({ post, index }) {
  const navigate = useNavigate();
  const { user } = post;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{index}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/info/${post['_id']}`)}
      >
        {post.title}
      </td>
      <td className="p-2 text-center truncate">{user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">
        {post.repliesCount}
      </td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {post.createdAt}
      </td>
    </tr>
  );
}
