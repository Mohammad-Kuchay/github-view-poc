import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchRepositories } from "../api/github";
import useDebounce from "../utils/useDebounce";
import RepositoryCard from "../components/RepositoryCard";
import { IRepository } from "../interfaces/repository";
import Loading from "../components/Loading";



const Repositories = () => {
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
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
        setRepositories(repos.items);
        setTotalCount(repos.total_count);
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
    debounceCurrentPage,
    debouncePerPage,
  ]);

  const renderGrid = () => {
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
        <div className="mt-8  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
          <div className="flex items-center gap-3">
            {currentPage > 1 ? (
              <button
                className="px-4 py-2 rounded bg-blue-100 text-blue-500 hover:bg-blue-200"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>
            ) : null}
            {totalCount > 0 ? (
            <button
              className="px-4 py-2 rounded bg-blue-100 text-blue-500 hover:bg-blue-200"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-3xl font-bold">GitHub View</h1>
        <div>
          <p className="text-xs text-gary-400">Start typing to search</p>
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
          <Loading/>
        ) : isDirty ? (
          repositories.length > 0 ? (
            renderGrid()
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
