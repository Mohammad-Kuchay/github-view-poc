import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockGetRepository } from "../api/github";

interface IRepository {
  name: string;
  description: string;
  language: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Repository = () => {
  const { owner, name } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [error, setError] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchRepository = async () => {
      setIsLoading(true);
      try {
        const repository = await mockGetRepository(owner, name);
        setRepository(repository);
        setIsLoading(false);
      } catch (error: any) {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchRepository();
  }, [owner, name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {error && <div>oh oh. Looks like this repository doesn't exist</div>}
      {repository && (
        <div className="max-w-7xl mx-auto mt-12">
          <button
            className="px-3 py-2 rounded-md bg-indigo-100 text-indigo-500 hover:bg-indigo-200 transition"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-5">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 5.95833C6.5 4.37809 7.12775 2.86256 8.24516 1.74516C9.36256 0.627751 10.8781 0 12.4583 0L43.875 0C44.306 0 44.7193 0.171205 45.0241 0.475951C45.3288 0.780698 45.5 1.19402 45.5 1.625V46.0417C45.5 46.4726 45.3288 46.886 45.0241 47.1907C44.7193 47.4955 44.306 47.6667 43.875 47.6667H30.875C30.444 47.6667 30.0307 47.4955 29.726 47.1907C29.4212 46.886 29.25 46.4726 29.25 46.0417C29.25 45.6107 29.4212 45.1974 29.726 44.8926C30.0307 44.5879 30.444 44.4167 30.875 44.4167H42.25V35.75H13C12.138 35.75 11.3114 36.0924 10.7019 36.7019C10.0924 37.3114 9.75 38.138 9.75 39V40.625C9.75 42.1763 10.6817 43.5153 12.025 44.1025C12.4067 44.2833 12.7029 44.6056 12.851 45.0011C12.9992 45.3967 12.9875 45.8343 12.8184 46.2213C12.6494 46.6084 12.3364 46.9144 11.9456 47.0746C11.5548 47.2348 11.117 47.2365 10.725 47.0795C9.4693 46.5312 8.40078 45.6285 7.65035 44.4821C6.89991 43.3356 6.50014 41.9952 6.5 40.625V5.95833ZM42.25 3.25H12.4583C10.9633 3.25 9.75 4.46333 9.75 5.95833V33.3688C10.7379 32.798 11.859 32.4983 13 32.5H42.25V3.25Z"
                  fill="#6366F1"
                />
                <path
                  d="M15.167 39.5417C15.167 39.398 15.2241 39.2602 15.3256 39.1587C15.4272 39.0571 15.565 39 15.7087 39H26.542C26.6857 39 26.8234 39.0571 26.925 39.1587C27.0266 39.2602 27.0837 39.398 27.0837 39.5417V50.3967C27.0832 50.4964 27.0552 50.594 27.0028 50.6788C26.9504 50.7636 26.8756 50.8323 26.7867 50.8773C26.6977 50.9223 26.5981 50.9419 26.4987 50.934C26.3994 50.926 26.3041 50.8908 26.2235 50.8322L21.4438 47.3568C21.3513 47.2895 21.2398 47.2533 21.1253 47.2533C21.0109 47.2533 20.8994 47.2895 20.8068 47.3568L16.0272 50.83C15.9467 50.8885 15.8516 50.9237 15.7525 50.9318C15.6533 50.9398 15.5538 50.9204 15.4649 50.8756C15.3761 50.8309 15.3013 50.7625 15.2487 50.678C15.1961 50.5935 15.1679 50.4962 15.167 50.3967V39.5417Z"
                  fill="#6366F1"
                />
              </svg>
              <div>
                <h1 className="text-3xl font-bold">{repository.name}</h1>
                <div className="flex items-center gap-5 mt-2 text-gray-600">
                  <p>
                    Created at{" "}
                    <span className="font-semibold">
                      {repository.created_at}
                    </span>
                  </p>
                  <p>
                    last updated on{" "}
                    <span className="font-semibold">
                      {repository.updated_at}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md max-w-max">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18.7185L6.9521 21.7594C6.7291 21.9013 6.49596 21.9621 6.25269 21.9418C6.00942 21.9215 5.79656 21.8405 5.61411 21.6985C5.43165 21.5566 5.28975 21.3791 5.18838 21.1658C5.08702 20.9525 5.06675 20.7145 5.12757 20.4518L6.46555 14.7045L1.99546 10.8426C1.79273 10.6601 1.66623 10.4521 1.61596 10.2186C1.56568 9.98507 1.58068 9.7572 1.66096 9.53502C1.74205 9.31202 1.86369 9.12956 2.02587 8.98766C2.18805 8.84575 2.41104 8.75452 2.69486 8.71398L8.59417 8.19703L10.8748 2.78426C10.9762 2.54099 11.1335 2.35853 11.3468 2.2369C11.56 2.11526 11.7778 2.05444 12 2.05444C12.223 2.05444 12.4407 2.11526 12.6531 2.2369C12.8656 2.35853 13.0229 2.54099 13.1251 2.78426L15.4058 8.19703L21.3051 8.71398C21.5889 8.75452 21.8119 8.84575 21.9741 8.98766C22.1362 9.12956 22.2579 9.31202 22.339 9.53502C22.4201 9.75801 22.4355 9.98628 22.3852 10.2198C22.3349 10.4534 22.208 10.661 22.0045 10.8426L17.5344 14.7045L18.8724 20.4518C18.9332 20.7153 18.9129 20.9537 18.8115 21.167C18.7102 21.3803 18.5683 21.5575 18.3858 21.6985C18.2034 21.8405 17.9905 21.9215 17.7472 21.9418C17.504 21.9621 17.2708 21.9013 17.0478 21.7594L12 18.7185Z"
                    fill="black"
                  />
                </svg>
                <p>
                  {repository.stargazers_count}{" "}
                  <span>
                    {repository.stargazers_count === 1 ? "Star" : "Stars"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md max-w-max">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.559 8.855C5.725 10.038 6.348 12.062 8.646 12.934C11 13.829 11 14.534 11 15V15.163C9.56 15.597 8.5 16.92 8.5 18.5C8.5 20.43 10.07 22 12 22C13.93 22 15.5 20.43 15.5 18.5C15.5 16.92 14.44 15.597 13 15.163V15C13 14.534 13 13.829 15.354 12.935C17.652 12.063 18.275 10.039 18.441 8.856C19.912 8.441 21 7.102 21 5.5C21 3.57 19.43 2 17.5 2C15.57 2 14 3.57 14 5.5C14 7.052 15.022 8.355 16.424 8.813C16.278 9.548 15.859 10.604 14.646 11.065C13.454 11.517 12.593 12.018 12 12.601C11.407 12.018 10.547 11.517 9.354 11.065C8.141 10.604 7.721 9.548 7.576 8.813C8.978 8.355 10 7.052 10 5.5C10 3.57 8.43 2 6.5 2C4.57 2 3 3.57 3 5.5C3 7.102 4.088 8.441 5.559 8.855ZM17.5 4C18.327 4 19 4.673 19 5.5C19 6.327 18.327 7 17.5 7C16.673 7 16 6.327 16 5.5C16 4.673 16.673 4 17.5 4ZM13.5 18.5C13.5 19.327 12.827 20 12 20C11.173 20 10.5 19.327 10.5 18.5C10.5 17.673 11.173 17 12 17C12.827 17 13.5 17.673 13.5 18.5ZM6.5 4C7.327 4 8 4.673 8 5.5C8 6.327 7.327 7 6.5 7C5.673 7 5 6.327 5 5.5C5 4.673 5.673 4 6.5 4Z"
                    fill="black"
                  />
                </svg>

                <p>
                  {repository.forks_count}{" "}
                  <span>{repository.forks_count === 1 ? "Fork" : "Forks"}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md max-w-max">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C3.98825 13.6503 5.24331 15.0407 6.80248 16.0133C8.36165 16.9858 10.1624 17.5013 12 17.5013C13.8376 17.5013 15.6383 16.9858 17.1975 16.0133C18.7567 15.0407 20.0117 13.6503 20.82 12C20.0117 10.3497 18.7567 8.95925 17.1975 7.98675C15.6383 7.01424 13.8376 6.49868 12 6.49868C10.1624 6.49868 8.36165 7.01424 6.80248 7.98675C5.24331 8.95925 3.98825 10.3497 3.18 12Z"
                    fill="black"
                  />
                </svg>

                <p>
                  {repository.watchers_count}{" "}
                  <span>
                    {repository.watchers_count === 1 ? "Watcher" : "Watchers"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6">
            <p>{repository.description}</p>
          </div>
          <div>
            <p className="font-bold text-lg pt-6 mt-6 border-t border-gray-200">
              Creator
            </p>
            <div className="flex items-center gap-5 mt-5">
              <img
                className="w-12 h-12 rounded-full"
                src={repository.owner.avatar_url}
                alt={`${repository.owner.login} 's profile photo`}
              />
              <p className="font-semibold">{repository.owner.login}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Repository;
