import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JobEventType } from '../../types/WorkflowType';

interface JobsState {
    events: Record<string, JobEventType>;
}

const initialState: JobsState = { events: {} };

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        jobEventReceived(state, action: PayloadAction<JobEventType>) {
            state.events[action.payload.job_id] = action.payload;
        },
    },
});

export const { jobEventReceived } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
