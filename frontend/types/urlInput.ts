export interface UrlInput {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  name: string;
  onChange: (event: Event) => void;
}
