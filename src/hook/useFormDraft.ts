import { useEffect } from "react";
import type { FieldValues, UseFormWatch } from "react-hook-form";

const drafts = new Map<string, Record<string, unknown>>();

export const _getDraft = (key: string) => {
    const draft = drafts.get(key);
    return draft ?? {};
}

export function useFormDraft<T extends FieldValues>(key: string | null) {
    const getDraft = () : Record<string, unknown> => {
        if(key) return _getDraft(key);
        return {};
    }
    const useSaveDraft = (watch: UseFormWatch<T>) => useEffect(() =>{
            if(!key) return;
            const subscription = watch((values) => {
                drafts.set(key, { ...values });
            });
            return () => subscription.unsubscribe();
        }, [watch])
    const reset = (foo:() => any) => {
        foo();
        if (key) drafts.delete(key);
    } 
    return { getDraft, useSaveDraft , reset};
}