import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const InputField = (props: InputFieldProps) => {
  const { className, ...attributes } = props;

  return (
    <input
      {...attributes}
      className={`w-full rounded-sm border border-gray-400 px-12px py-6px outline-none focus:border-chelsea ${className}`}
    />
  );
};

export default InputField;
