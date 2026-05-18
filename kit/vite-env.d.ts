/**
 * Ambient type declarations for static assets.
 * Replaces `/// <reference types="vite/client" />` so this file works
 * without vite installed in the kit folder.
 *
 * When you copy kit/ into your own Vite project, replace this file with:
 *   /// <reference types="vite/client" />
 */

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.scss" {
  const classes: Record<string, string>;
  export default classes;
}
