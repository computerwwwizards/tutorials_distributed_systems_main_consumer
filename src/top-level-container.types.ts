export type DefaultAuthStatus = 'single-user' | 'many-users' | 'no-user'

export interface IAppService<AutStatus extends DefaultAuthStatus = DefaultAuthStatus >{
  registerStartHandlers?(): Promise<void>;
  registerEndHandlers?(): Promise<void>;
  getAuthStatus<Meta = any>(meta?: Meta): Promise<AutStatus>;
  redirectToLogin<Meta = any>(meta?: Meta): Promise<void>;
  redirectToChooseUser?<Meta = any>(meta?: Meta): Promise<void>;
  renderMainApp<Meta = any>(meta?: Meta): Promise<void>;
  init(): Promise<void>;
}

declare module './index.types.ts'{
  interface TopLevelContainerServices{
    'app-service': IAppService
  }
}