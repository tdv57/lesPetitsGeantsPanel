import { Button, Collapsible } from "@chakra-ui/react";
import { GenerateForm } from "../form/GenerateForm";
import type { TypeImageEnum } from "../../enum/TypeImageEnum";

type GenerateAccordionPropsType = {
    draftKey: string | null;
    onSubmit: (prompt: string) => void;
    typeImage: TypeImageEnum;
    locked?: boolean
}
export function GenerateAccordion(props : GenerateAccordionPropsType) {
    return (
    <>
        <Collapsible.Root>
            <Collapsible.Trigger asChild>
                <Button variant="outline">Cliquez pour l'autocomplétion des champs manquants par IA</Button>
            </Collapsible.Trigger>

            <Collapsible.Content>
                <GenerateForm {...props}/>
            </Collapsible.Content>
        </Collapsible.Root>
    </>
    )
}