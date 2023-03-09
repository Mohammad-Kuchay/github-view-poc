import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockSearchRepositories, searchRepositories } from "../api/github";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("best-match");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchRepositories = async () => {
      const repos = await mockSearchRepositories(
        searchTerm,
        languageFilter,
        username,
        currentPage,
        perPage,
        sortColumn,
        sortOrder
      );
      setRepositories(repos);
    };
    fetchRepositories();
  }, [
    searchTerm,
    languageFilter,
    username,
    sortColumn,
    sortOrder,
    currentPage,
    perPage,
  ]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Repositories</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="searchTerm">Search Term</label>
            <input
              type="text"
              className="form-control"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="languageFilter">Language Filter</label>
            <input
              type="text"
              className="form-control"
              id="languageFilter"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="sortColumn">Sort Column</label>
            <select
              className="form-control"
              id="sortColumn"
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
            >
              <option value="best-match">Best Match</option>
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="updated">Updated</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="sortOrder">Sort Order</label>
            <select
              className="form-control"
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="currentPage">Current Page</label>
            <input
              type="number"
              className="form-control"
              id="currentPage"
              value={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="perPage">Per Page</label>
            <input
              type="number"
              className="form-control"
              id="perPage"
              value={perPage}
              onChange={(e) => setPerPage(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Language</th>
                <th>Stars</th>
                <th>Forks</th>
                <th>Watchers</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {repositories.map((repo) => (
                <tr key={repo.id}>
                  <td>
                    <Link to={`/repositories/${repo.id}`}>{repo.name}</Link>
                  </td>
                  <td>{repo.description}</td>
                  <td>{repo.created_at}</td>
                  <td>{repo.updated_at}</td>
                  <td>{repo.language}</td>
                  <td>{repo.stargazers_count}</td>
                  <td>{repo.forks_count}</td>
                  <td>{repo.watchers_count}</td>
                  <td>
                    <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Repositories;
