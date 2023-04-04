import { Link } from "react-router-dom";
import { IRepository, IRepositoryCrad } from "../interfaces/repository";



const RepositoryCard = (props: IRepositoryCrad) => {
  const { repository } = props;
    return (
      <Link
        className="border border-gray-300 bg-gray-50 rounded-lg hover:bg-blue-100 p-5"
        to={`/${repository.owner.login}/${repository.name}`}
      >
        <h3 className="text-2xl text-blue-500 font-bold">{repository.name}</h3>
  
        <p>{repository.description}</p>
        <div>
          <div className="flex items-center gap-3 mt-5">
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
        <div className="mt-5 flex gap-3 text-sm">
          <p>Created at: {repository.created_at}</p>
          <p>Updated at: {repository.updated_at}</p>
        </div>
  
        <div>
          <p className="font-bold text-lg pt-6 mt-5 border-t border-gray-200">
            Creator
          </p>
          <div className="flex items-center gap-5 mt-2">
            <img
              className="w-12 h-12 rounded-full"
              src={repository.owner.avatar_url}
              alt={`${repository.owner.login} 's profile photo`}
            />
            <p className="font-semibold">{repository.owner.login}</p>
          </div>
        </div>
      </Link>
    );
  };

  export default RepositoryCard;