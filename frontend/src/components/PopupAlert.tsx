import React from "react";

interface PopupAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  success?: boolean;
}

const PopupAlert: React.FC<PopupAlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  success,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="absolute bg-white rounded-lg p-4 max-w-sm w-full shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-full">
              {/* Icon or symbol for the alert */}
              {success ? (
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <div className="mt-4">
              <h3
                className="text-lg font-medium text-gray-900"
                id="modal-headline"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className={`${
                  success
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  success ? "focus:ring-green-500" : "focus:ring-red-500"
                } sm:text-sm`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupAlert;
