import { Link, useLocation } from 'react-router-dom';

export default function Pagination({ pageInfo }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlExcludedPage = getUrlExcludedPage(params);

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        {Array(pageInfo.totalPages)
          .fill()
          .map((_, i) => (
            <li
              key={i}
              className={
                pageInfo.page === i + 1 ? `text-bold text-blue-700` : ''
              }
            >
              <Link
                to={`${location.pathname}?${urlExcludedPage}&page=${i + 1}`}
              >
                {i + 1}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

function getUrlExcludedPage(params) {
  params.delete('page');

  return params.toString();
}
