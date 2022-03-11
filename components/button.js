export default function Button({
  children,
  onClick,
  isLoading,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-indigo-500 hover:bg-indigo-600 flex w-full max-w-min items-center justify-center whitespace-nowrap rounded-md px-5 py-2 text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      {...rest}
    >
      {isLoading && (
        <svg
          className="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <div className="flex whitespace-nowrap">{children}</div>
    </button>
  );
}
