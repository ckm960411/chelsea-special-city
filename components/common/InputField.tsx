import { InputHTMLAttributes } from 'react';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

interface ErrorSign {
  isOpen: boolean;
  message: string;
}
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  errorSign?: ErrorSign;
}
const InputField = (props: InputFieldProps) => {
  const { className, label, errorSign, ...attributes } = props;

  return (
    <div className="relative flex flex-col items-start">
      {label && <label className="mb-8px text-16px font-normal text-gray-800">{label}</label>}
      <input
        {...attributes}
        className={`w-full rounded-sm border px-12px py-6px outline-none ${
          errorSign?.isOpen ? 'border-red-500' : 'border-gray-400 focus:border-chelsea'
        } ${className}`}
      />
      {errorSign?.isOpen && (
        <p className="mt-4px flex items-center gap-4px text-14px font-normal text-red-500">
          <ExclamationTriangleIcon className="h-20px w-20px" />
          {errorSign.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
