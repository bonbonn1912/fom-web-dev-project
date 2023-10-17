export interface IWorkoutPost {
    owner_id: number;
    object_type: string;
    object_id: number;
    aspect_type: string;
    event_time: number;
    updates?: {
        title: string;
        type: string;
    }
}