
export interface StateError {
  hasError: boolean;
  message?: string;
}

export const fieldRequiredError:StateError = {
  hasError: true,
  message: "This field is required",
}

export const noError:StateError = { hasError: false, message: undefined }
