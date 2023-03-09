import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getRepository = async (
  owner: string | undefined,
  name: string | undefined
) => {
  const url = `${BASE_URL}/repos/${owner}/${name}`;
  const response = await axios.get(url);
  return response.data;
};

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

interface ISearchResponse {
  items: IRepository[];
}

export async function searchRepositories(
  searchTerm: string,
  language: string,
  username: string,
  page: number,
  perPage: number,
  order: string
): Promise<IRepository[]> {
  let query = searchTerm;
  query += language ? `+language:${language}` : "";
  query += username ? `+user:${username}` : "";
  const url = `${BASE_URL}/search/repositories?q=${query}&order=${order}&per_page=${perPage}&page=${page}`;
  const response = await axios.get<ISearchResponse>(url);
  return response.data.items;
}
