import type { ReactNode } from "react";

export interface HeaderComponentsService {
  getLogo(): Promise<ReactNode>;
  getNavigation(): Promise<ReactNode>;
  getUserProfile(): Promise<ReactNode>;
}

declare module '../types.ts' {
  interface GlobalServices {
    'header-components-service': HeaderComponentsService
  }
}