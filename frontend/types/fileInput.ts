import type { CustomFile } from '~/types/customFile'

export interface FileInput {
  onAdd: (file: CustomFile) => void;
  onRemove: (file: File) => void;
  onError: (error: string) => void;
}
