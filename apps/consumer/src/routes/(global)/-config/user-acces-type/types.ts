export type DefaulTiers = 'paid' | 'free'

export interface UserAccessType<Tiers extends string = DefaulTiers, Role extends string = string >{
  getTier(): Promise<Tiers>;
  isLegacyUser(): Promise<boolean>;
  getRole(): Promise<Role>
}

declare module '../types.ts' {
  interface GlobalServices {
    'user-access-type': UserAccessType
  }
}