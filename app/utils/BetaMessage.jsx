import React from "react";

function BetaMessage() {
  return (
    <div className="w-full">
      <div className="flex p-4 text-blue-800 bg-blue-50 rounded-lg w-full ">
        {" "}
        {/* am adaugat pl-10 */}
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 100-2zM9 14a1 1 0 100 2 1 1 0 000-2z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">
          Site-ul este în beta. Incarcarea poate fi mai lenta
        </div>
      </div>
    </div>
  );
}

export default BetaMessage;
