import React, { useState, useEffect } from "react";
import type { SortField, SortOrder } from "../types";
import { getStoredState, saveState } from "../utils/storage";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "./CommentsScreen";
import { useGetUsersComments } from "../hooks/use-get-data";

type PageType = "dashboard" | "profile";

const Dashboard: React.FC = () => {
  const storedState = getStoredState();

  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const [searchTerm, setSearchTerm] = useState(storedState.searchTerm || "");
  const [currentPageNum, setCurrentPageNum] = useState(
    storedState.currentPageNum || 1
  );
  const [pageSize, setPageSize] = useState(storedState.pageSize || 10);
  const [sortField, setSortField] = useState<SortField>(
    storedState.sortField || null
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    storedState.sortOrder || null
  );

  useEffect(() => {
    saveState({
      searchTerm,
      currentPageNum,
      pageSize,
      sortField,
      sortOrder,
    });
  }, [searchTerm, currentPageNum, pageSize, sortField, sortOrder]);

  const { user, comments, loading, error } = useGetUsersComments();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === null) {
        setSortOrder("asc");
      } else if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortField(null);
        setSortOrder(null);
      }
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPageNum(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPageNum(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPageNum(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-xl mb-2">⚠️ Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (currentPage === "profile" && user) {
    return (
      <ProfileScreen
        user={user}
        onBackToDashboard={() => setCurrentPage("dashboard")}
      />
    );
  }

  return (
    <CommentsScreen
      comments={comments}
      searchTerm={searchTerm}
      currentPageNum={currentPageNum}
      pageSize={pageSize}
      sortField={sortField}
      sortOrder={sortOrder}
      onSearchChange={handleSearch}
      onPageChange={setCurrentPageNum}
      onPageSizeChange={handlePageSizeChange}
      onSort={handleSort}
      onViewProfile={() => setCurrentPage("profile")}
    />
  );
};

export default Dashboard;
