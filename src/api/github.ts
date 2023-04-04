import axios from "axios";
import { IRepository, ISearchResponse } from "../interfaces/repository";

const BASE_URL = "https://api.github.com";

export const getRepository = async (
  owner: string | undefined,
  name: string | undefined
): Promise<IRepository> => {
  const url = `${BASE_URL}/repos/${owner}/${name}`;
  const response = await axios.get<IRepository>(url);
  return response.data;
};

export async function searchRepositories(
  searchTerm: string,
  language: string,
  username: string,
  page: number,
  perPage: number,
  order: string
): Promise<ISearchResponse> {
  let query = searchTerm;
  query += language ? `+language:${language}` : "";
  query += username ? `+user:${username}` : "";
  const url = `${BASE_URL}/search/repositories?q=${query}&order=${order}&per_page=${perPage}&page=${page}`;
  const response = await axios.get<ISearchResponse>(url);
  return response.data;
}
