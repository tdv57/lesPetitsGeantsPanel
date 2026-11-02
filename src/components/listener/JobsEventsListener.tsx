import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { eventsJobs } from '../../client/SseClient';
import type { JobEventType } from '../../types/WorkflowType';
import { jobEventReceived } from '../../redux/slice/JobsSlice';
import { TraitementApi } from '../../redux/features/traitement/TraitementApi';

export function JobsEventsListener() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        return eventsJobs.subscribe((jobEvent: JobEventType) => {
            dispatch(jobEventReceived(jobEvent));
            dispatch(
                TraitementApi.util.invalidateTags([{ type: 'traitement', id: jobEvent.job_id }]),
            );
        });
    }, [dispatch]);
    return <></>;
}
