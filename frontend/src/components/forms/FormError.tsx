import { projectPageStyles } from "../../styles/projectStyles";

interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return <div className={projectPageStyles.error.container}>{message}</div>;
};
