import type { ReactNode } from "react";

export interface HeaderComponentsService {
  getLogo(): ReactNode;
  getNavigation(): ReactNode;
  getUserProfile(): ReactNode;
}

declare module '../types.ts' {
  interface GlobalServices {
    'header-components-service': HeaderComponentsService
  }
}