export interface IRepository {
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

  export interface IRepositoryCrad {
    repository: IRepository;
  }

  export interface ISearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: IRepository[];
  }