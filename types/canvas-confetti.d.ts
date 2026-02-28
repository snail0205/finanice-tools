declare module "canvas-confetti" {
  export type Options = Record<string, unknown>;
  export type GlobalOptions = Record<string, unknown>;
  export type CreateTypes = unknown;

  const confetti: (options?: Options) => Promise<null> | null;
  export default confetti;
}
