import { useState } from "react";
import { traitement } from "../../service/WorkflowService";   // adapte le chemin
import { useJobEvent } from "../../hook/useEventsJobs";
import { COLORS } from "../../theme/Couleur";

export function ImageTraitement() {
  const [jobId, setJobId] = useState<string | null>(null);
  const event = useJobEvent(jobId);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const accepted = await traitement(file);
    if (accepted) setJobId(accepted.job_id); 
  }

  return (
    <div>
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onChange} />
        {jobId && !event && <p style={{ color: COLORS.textDark }}>Envoyé, en attente…</p>}
        {event && <p style={{ color: COLORS.textDark }}>Statut : {event.status}</p>}
    </div>
  );
}