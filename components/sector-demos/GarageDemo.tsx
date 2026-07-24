"use client";

import { useTranslations } from "next-intl";
import DemoStage, { type DemoStep } from "./DemoStage";
import PhoneRingScene from "./scenes/PhoneRingScene";
import WorkflowMiniCanvas, { type WorkflowNode } from "./scenes/WorkflowMiniCanvas";
import ConversationBubbles, { type ConversationTurn } from "./scenes/ConversationBubbles";
import ValidationCard from "./scenes/ValidationCard";
import { PhoneIcon, WaveformIcon, SparkIcon, CalendarCheckIcon } from "./icons";

const WORKFLOW_ICONS = [
  <PhoneIcon key="phone" />,
  <WaveformIcon key="waveform" />,
  <SparkIcon key="spark" />,
  <CalendarCheckIcon key="calendar" />,
];

/**
 * Garage's flagship automation, staged as three real moments instead of
 * one diagram: the missed call, the AI reading the request against the
 * real schedule, and the appointment card the garagiste has to confirm
 * before it's real. Transposed from the vlogyz Remotion garage family
 * (same three-beat structure, same node names) into native React/CSS —
 * gold/dark nbhc.fr palette instead of Remotion's Apple-blue tokens.
 */
export default function GarageDemo() {
  const t = useTranslations("showcase.demos.garage");
  const tStage = useTranslations("showcase.demoStage");

  const workflowNodes: WorkflowNode[] = (t.raw("workflowLabels") as string[]).map((label, i) => ({
    label,
    icon: WORKFLOW_ICONS[i],
  }));
  const conversation: ConversationTurn[] = t.raw("conversation") as ConversationTurn[];
  const validationLines = (t.raw("validationLines") as { label: string; value: string }[]);

  const steps: DemoStep[] = [
    {
      id: "trigger",
      title: t("step1Title"),
      content: <PhoneRingScene caption={t("step1Caption")} />,
    },
    {
      id: "processing",
      title: t("step2Title"),
      content: (
        <div className="flex flex-col items-center gap-8">
          <WorkflowMiniCanvas nodes={workflowNodes} ariaLabel={t("step2Title")} />
          <ConversationBubbles turns={conversation} />
        </div>
      ),
    },
    {
      id: "validation",
      title: t("step3Title"),
      isValidation: true,
      content: (
        <ValidationCard
          title={t("validationCardTitle")}
          lines={validationLines}
          validateLabel={t("validateLabel")}
          confirmedLabel={t("confirmedLabel")}
          helperText={t("step3Caption")}
        />
      ),
    },
  ];

  return (
    <DemoStage
      steps={steps}
      ariaLabel={t("ariaLabel")}
      labels={{
        prev: tStage("prev"),
        next: tStage("next"),
        stepsAriaLabel: tStage("stepsAriaLabel"),
      }}
    />
  );
}
