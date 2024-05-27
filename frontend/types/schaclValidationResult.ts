export interface SHACLValidationResult {
  conforms?: boolean;
  type?: string;
  resultPath?: string;
  resultMessage?: string;
  // picked any because the keys are dynamic
  [key: string]: any;
};
