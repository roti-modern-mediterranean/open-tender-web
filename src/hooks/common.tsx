
export interface StateError {
  hasError: boolean;
  message?: string;
  forceShowError: () => void;
}
