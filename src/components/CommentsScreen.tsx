import React, { useMemo } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, User } from "lucide-react";
import type { Comment, SortField, SortOrder } from "../types";
import Table from "./Table";
import Pagination from "./Pagination";

interface CommentsScreenProps {
  comments: Comment[];
  searchTerm: string;
  currentPageNum: number;
  pageSize: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSearchChange: (term: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (field: SortField) => void;
  onViewProfile: () => void;
}

const CommentsScreen: React.FC<CommentsScreenProps> = ({
  comments,
  searchTerm,
  currentPageNum,
  pageSize,
  sortField,
  sortOrder,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onSort,
  onViewProfile,
}) => {
  // Filter and sort comments
  const filteredAndSortedComments = useMemo(() => {
    const filtered = comments.filter(comment => {
      const term = searchTerm.toLowerCase();
      return (
        comment.name.toLowerCase().includes(term) ||
        comment.email.toLowerCase().includes(term) ||
        comment.postId.toString().includes(term)
      );
    });

    if (sortField && sortOrder) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
          case "postId":
            aValue = a.postId;
            bValue = b.postId;
            break;
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case "email":
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [comments, searchTerm, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedComments.length / pageSize);
  const paginatedComments = filteredAndSortedComments.slice(
    (currentPageNum - 1) * pageSize,
    currentPageNum * pageSize
  );

  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    if (sortOrder === "asc") {
      return <ArrowUp className="w-4 h-4 text-blue-600" />;
    }
    if (sortOrder === "desc") {
      return <ArrowDown className="w-4 h-4 text-blue-600" />;
    }
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Comments Dashboard
            </h1>
            <button
              onClick={onViewProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              View Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or post ID..."
                  value={searchTerm}
                  onChange={e => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Page size:</span>
                <select
                  value={pageSize}
                  onChange={e => onPageSizeChange(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>

          <Table
            onSort={onSort}
            renderSortIcon={renderSortIcon}
            paginatedComments={paginatedComments}
          />

          <Pagination
            pageSize={pageSize}
            currentPageNum={currentPageNum}
            filteredAndSortedComments={filteredAndSortedComments}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsScreen;
