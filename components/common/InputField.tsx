import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}
const InputField = (props: InputFieldProps) => {
  const { className, label, ...attributes } = props;

  return (
    <div className="flex flex-col items-start">
      {label && <label className="mb-4px font-normal text-gray-800">{label}</label>}
      <input
        {...attributes}
        className={`w-full rounded-sm border border-gray-400 px-12px py-6px outline-none focus:border-chelsea ${className}`}
      />
    </div>
  );
};

export default InputField;
