import React from "react";
import type { Comment } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationComponentsProps {
  currentPageNum: number;
  pageSize: number;
  totalPages: number;
  filteredAndSortedComments: Comment[];
  onPageChange: (a: number) => void;
}

const Pagination: React.FC<PaginationComponentsProps> = props => {
  const {
    currentPageNum,
    pageSize,
    filteredAndSortedComments,
    onPageChange,
    totalPages,
  } = props;
  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing{" "}
          {Math.min(
            (currentPageNum - 1) * pageSize + 1,
            filteredAndSortedComments.length
          )}{" "}
          to{" "}
          {Math.min(
            currentPageNum * pageSize,
            filteredAndSortedComments.length
          )}{" "}
          of {filteredAndSortedComments.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPageNum - 1))}
            disabled={currentPageNum === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 text-sm">
            Page {currentPageNum} of {totalPages}
          </span>
          <button
            onClick={() =>
              onPageChange(Math.min(totalPages, currentPageNum + 1))
            }
            disabled={currentPageNum === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
