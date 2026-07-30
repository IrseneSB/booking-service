// Owned by: Resource Management feature.
export interface ResourceEntity {
  id: number;
  uuid: string;
  name: string;
  type: string;
  capacity: number;
  is_blocked: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResourceForm {
  name: string;
  type: string;
  capacity: number;
}