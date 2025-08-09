import { useEffect, useState } from "react";
import type { Comment, User } from "../types";

interface GetUsersCommentsType {
  user: User | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

type GetDataType = () => GetUsersCommentsType;

export const useGetUsersComments: GetDataType = () => {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [usersResponse, commentsResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);

        if (!usersResponse.ok || !commentsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData: User[] = await usersResponse.json();
        const commentsData: Comment[] = await commentsResponse.json();

        setUser(usersData[0]);
        setComments(commentsData);
      } catch (err) {
        setError("Failed to load data. Please try again." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    user,
    comments,
    loading,
    error,
  };
};
