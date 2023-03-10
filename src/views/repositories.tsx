import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchRepositories } from "../api/github";
import useDebounce from "../utils/useDebounce";

interface IRepository {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Repositories = () => {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [repoName, setRepoName] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const debouncerepoName = useDebounce<string>(repoName, 500);
  const debounceLangFilter = useDebounce<string>(languageFilter, 500);
  const debounceUser = useDebounce<string>(username, 500);
  const debounceCurrentPage = useDebounce<number>(currentPage, 1000);
  const debouncePerPage = useDebounce<number>(perPage, 1000);

  useEffect(() => {
    const fetchRepositories = async () => {
      setIsLoading(true);
      try {
        const repos = await searchRepositories(
          debouncerepoName,
          debounceLangFilter,
          debounceUser,
          debounceCurrentPage,
          debouncePerPage,
          sortOrder
        );
        setRepositories(repos);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setRepositories([]);
      }
    };

    if (debouncerepoName || debounceLangFilter || debounceUser) {
      setIsDirty(true);
      fetchRepositories();
    } else {
      setIsDirty(false);
    }
  }, [
    debouncerepoName,
    debounceLangFilter,
    debounceUser,
    sortOrder,
    currentPage,
    perPage,
  ]);

  const renderTable = () => {
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Repositories</p>
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <label htmlFor="sortOrder" className="font-medium mb-1">
                Sort Order
              </label>
              <select
                className="border border-gray-400 px-2 py-1"
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="currentPage" className="font-medium mb-1">
                Current Page
              </label>
              <input
                type="number"
                className="border border-gray-400 px-2 py-1 w-24"
                id="currentPage"
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="perPage" className="font-medium mb-1">
                Per Page
              </label>
              <input
                type="number"
                className="border border-gray-400 px-2 py-1 w-24"
                id="perPage"
                value={perPage}
                onChange={(e) => setPerPage(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 mt-8">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Updated</th>
                <th className="px-4 py-2">Language</th>
                <th className="px-4 py-2">Stars</th>
                <th className="px-4 py-2">Forks</th>
                <th className="px-4 py-2">Watchers</th>
                <th className="px-4 py-2">Owner</th>
              </tr>
            </thead>
            <tbody>
              {repositories?.map((repo) => (
                <tr key={repo.id}>
                  <td className="border px-4 py-2">
                    <Link
                      className="underline text-indigo-500 "
                      to={`/${repo.owner.login}/${repo.name}`}
                    >
                      {repo.name}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">{repo.description}</td>
                  <td className="border px-4 py-2">{repo.created_at}</td>
                  <td className="border px-4 py-2">{repo.updated_at}</td>
                  <td className="border px-4 py-2">{repo.language}</td>
                  <td className="border px-4 py-2">{repo.stargazers_count}</td>
                  <td className="border px-4 py-2">{repo.forks_count}</td>
                  <td className="border px-4 py-2">{repo.watchers_count}</td>
                  <td className="border px-4 py-2">
                    <img
                      title={repo.owner.login}
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-3xl font-bold">GitHub View</h1>
        <div>
          <p className="Text-xs text-gary-400">Start typing to search</p>
          <div className="flex gap-5">
            <div className="flex flex-col">
              <label htmlFor="repoName" className="font-medium mb-1">
                Search for repositry
              </label>
              <input
                type="text"
                className="border border-gray-400 px-2 py-1"
                id="repoName"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="font-medium mb-1">
                Filter by username
              </label>
              <input
                type="text"
                className="border border-gray-400 px-2 py-1"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="languageFilter" className="font-medium mb-1">
                Filter by language
              </label>
              <input
                type="text"
                className="border border-gray-400 px-2 py-1"
                id="languageFilter"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-8 mt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : isDirty ? (
          repositories.length > 0 ? (
            renderTable()
          ) : (
            <p>No results</p>
          )
        ) : (
          <p>Search for repositories</p>
        )}
      </div>
    </div>
  );
};
export default Repositories;
