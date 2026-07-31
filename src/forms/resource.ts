export interface ResourceEntity {
  id: number;
  uuid: string;
  name: string;
  type: string;
  capacity: number;
<<<<<<< HEAD
  blocked: boolean;
=======
  is_blocked: boolean;
>>>>>>> a4c0eb0 (Implement real availability filtering (search, isWithinAvailabilityWindow), using is_blocked/open_time/close_time from Feature 1's ResourceService)
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