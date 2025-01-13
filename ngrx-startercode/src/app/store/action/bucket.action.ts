import { createAction, props } from "@ngrx/store";
import { Bucket } from "../../../models/bucket.model";

export const AddToBucket = createAction('[bucket] Add Bucket', props<{payload:Bucket}>())
export const RemoveFromBucket = createAction('[bucket] remove Bucket', props<{payload:Partial<Bucket>}>())