export type PlatformLabel = { x: number; y: number; o: number };

export const platformLabels: Record<'meta' | 'google' | 'telegram', PlatformLabel> = {
  meta: { x: -9999, y: -9999, o: 0 },
  google: { x: -9999, y: -9999, o: 0 },
  telegram: { x: -9999, y: -9999, o: 0 },
};
