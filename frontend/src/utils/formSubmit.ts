import type { ProjectRequest } from "../schemas/projectFormSchema";

export const createFormSubmitHandler = (
  onSubmit: (data: ProjectRequest) => void
) => {
  const handleFormSubmit = async (data: ProjectRequest) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return { handleFormSubmit };
};
