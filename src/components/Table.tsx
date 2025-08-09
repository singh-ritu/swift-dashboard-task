import React from "react";
import type { Comment, SortField } from "../types";

interface TableComponentProps {
  onSort: (a: SortField) => void;
  renderSortIcon: (a: SortField) => React.ReactNode;
  paginatedComments: Comment[];
}

const Table: React.FC<TableComponentProps> = props => {
  const { onSort, renderSortIcon, paginatedComments } = props;
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => onSort("postId")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-2">
                Post ID
                {renderSortIcon("postId")}
              </div>
            </th>
            <th
              onClick={() => onSort("name")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-2">
                Name
                {renderSortIcon("name")}
              </div>
            </th>
            <th
              onClick={() => onSort("email")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-2">
                Email
                {renderSortIcon("email")}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comment
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedComments.map(comment => (
            <tr key={comment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {comment.postId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {comment.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {comment.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="max-w-xs truncate">{comment.body}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
