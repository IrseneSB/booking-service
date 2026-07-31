// Owned by: Resource Management feature.
// Extend with availability-window and blocked-state fields as you build those out.

export interface ResourceEntity {
  id: number;
  uuid: string;
  name: string;
  type: string;
  capacity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResourceForm {
  name: string;
  type: string;
  capacity: number;
}
