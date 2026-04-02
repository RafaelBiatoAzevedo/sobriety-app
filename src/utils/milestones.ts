import { Milestone } from "../interfaces/milestone";

export function getUnlockedMilestones(
  milestones: Milestone[],
  totalDays: number,
) {
  return milestones.map((m) => ({
    ...m,
    unlocked: totalDays >= m.days,
  }));
}

export function getNextMilestone(milestones: Milestone[], totalDays: number) {
  return milestones.find((m) => totalDays < m.days);
}

export function getDaysToNextMilestone(
  nextMilestone: Milestone | undefined,
  totalDays: number,
) {
  if (!nextMilestone) return 0;

  return nextMilestone.days - totalDays;
}

export function getMilestoneProgress(milestoneDays: number, totalDays: number) {
  const progress = totalDays / milestoneDays;

  return Math.min(progress, 1);
}
