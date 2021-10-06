export interface kObject {
  label: string;
  replicas: number;
  getLabel: () => string;
}