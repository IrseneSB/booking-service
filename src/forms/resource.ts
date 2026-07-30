export interface ResourceEntity {
  id: number;
  uuid: string;
  name: string;
  type: string;
  capacity: number;
  is_blocked: boolean;
  open_time: string | null;
  close_time: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResourceForm {
  name: string;
  type: string;
  capacity: number;
}

export interface SetAvailabilityForm {
  open_time: string;
  close_time: string;
}