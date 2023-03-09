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
  sort: string,
  order: string
): Promise<IRepository[]> {
  let query = searchTerm;
  query += language ? `+language:${language}` : "";
  query += username ? `+user:${username}` : "";
  const url = `${BASE_URL}/search/repositories?q=${query}&sort=${sort}&order=${order}&page=${page}&per_page=${perPage}`;
  const response = await axios.get<ISearchResponse>(url);
  return response.data.items;
}

// make mock methods of above functions
async function mockGetRepository(owner: string, name: string) {
  return {
    id: 1,
    name: "test",
    description: "test",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    html_url: "",
    language: "javascript",
    stargazers_count: 1,
    forks_count: 1,
    watchers_count: 1,
    owner: {
      login: "test",
      avatar_url: "test",
    },
  };
}

export async function mockSearchRepositories(
  searchTerm: string,
  language: string,
  username: string,
  page: number,
  perPage: number,
  sort: string,
  order: string
) {
  return [
    {
      id: 1,
      name: "test",
      description: "test",
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
      html_url: "",
      language: "javascript",
      stargazers_count: 1,
      forks_count: 1,
      watchers_count: 1,
      owner: {
        login: "test",
        avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNhuDm_BT-uXzNljvOeSX5kvXyNV8VkE7fYe0VeTV8A&s",
      },
    },
  ];
}

