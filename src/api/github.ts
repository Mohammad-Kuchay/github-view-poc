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
  const url = `${BASE_URL}/search/repositories?q=${query}&order=${order}&page=${page}&per_page=${perPage}`;
  const response = await axios.get<ISearchResponse>(url);
  return response.data.items;
}


// make mock methods of above functions
export async function mockGetRepository(owner: string, name: string) {
  return {
    "id": 571436679,
    "node_id": "R_kgDOIg9uhw",
    "name": "microservice-DDD",
    "full_name": "mnffaisy1/microservice-DDD",
    "private": false,
    "owner": {
      "login": "mnffaisy1",
      "id": 30928277,
      "node_id": "MDQ6VXNlcjMwOTI4Mjc3",
      "avatar_url": "https://avatars.githubusercontent.com/u/30928277?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/mnffaisy1",
      "html_url": "https://github.com/mnffaisy1",
      "followers_url": "https://api.github.com/users/mnffaisy1/followers",
      "following_url": "https://api.github.com/users/mnffaisy1/following{/other_user}",
      "gists_url": "https://api.github.com/users/mnffaisy1/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/mnffaisy1/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/mnffaisy1/subscriptions",
      "organizations_url": "https://api.github.com/users/mnffaisy1/orgs",
      "repos_url": "https://api.github.com/users/mnffaisy1/repos",
      "events_url": "https://api.github.com/users/mnffaisy1/events{/privacy}",
      "received_events_url": "https://api.github.com/users/mnffaisy1/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/mnffaisy1/microservice-DDD",
    "description": null,
    "fork": false,
    "url": "https://api.github.com/repos/mnffaisy1/microservice-DDD",
    "forks_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/forks",
    "keys_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/teams",
    "hooks_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/hooks",
    "issue_events_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/issues/events{/number}",
    "events_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/events",
    "assignees_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/assignees{/user}",
    "branches_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/branches{/branch}",
    "tags_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/tags",
    "blobs_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/languages",
    "stargazers_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/stargazers",
    "contributors_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/contributors",
    "subscribers_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/subscribers",
    "subscription_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/subscription",
    "commits_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/contents/{+path}",
    "compare_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/merges",
    "archive_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/downloads",
    "issues_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/issues{/number}",
    "pulls_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/labels{/name}",
    "releases_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/releases{/id}",
    "deployments_url": "https://api.github.com/repos/mnffaisy1/microservice-DDD/deployments",
    "created_at": "2022-11-28T05:56:51Z",
    "updated_at": "2023-03-09T00:21:13Z",
    "pushed_at": "2022-11-28T05:57:21Z",
    "git_url": "git://github.com/mnffaisy1/microservice-DDD.git",
    "ssh_url": "git@github.com:mnffaisy1/microservice-DDD.git",
    "clone_url": "https://github.com/mnffaisy1/microservice-DDD.git",
    "svn_url": "https://github.com/mnffaisy1/microservice-DDD",
    "homepage": null,
    "size": 254,
    "stargazers_count": 1,
    "watchers_count": 1,
    "language": "TypeScript",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "has_discussions": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "allow_forking": true,
    "is_template": false,
    "web_commit_signoff_required": false,
    "topics": [],
    "visibility": "public",
    "forks": 0,
    "open_issues": 0,
    "watchers": 1,
    "default_branch": "main",
    "permissions": {
      "admin": false,
      "maintain": false,
      "push": false,
      "triage": false,
      "pull": true
    },
    "temp_clone_token": "",
    "network_count": 0,
    "subscribers_count": 1
  };
}

export async function mockSearchRepositories(
  searchTerm: string,
  language: string,
  username: string,
  page: number,
  perPage: number,
  order: string
) {
  return [
    {
      id: 1,
      name: "test",
      description: "test",
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
      html_url: "https://www.github.com/mnffaisy1/microservice-DDD",
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

