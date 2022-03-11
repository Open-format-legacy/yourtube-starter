export default function Input({ name, label, ...rest }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        type={name}
        name={name}
        id={name}
        {...rest}
      />
    </div>
  );
}
