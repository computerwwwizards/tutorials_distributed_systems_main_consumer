import { Outlet, PatchRoutesOnNavigationFunctionArgs, useLoaderData } from "react-router";

const patchOnNavigation = function patchOnNavigation(
  {
    patch,
    path,
  }: PatchRoutesOnNavigationFunctionArgs,
  ctx: any
) {
  if (path.startsWith('/test')) {
    patch(null, [{
      path: '/test',
      loader() {
        const headerService = ctx.get('header-components-service');
        return {
          logo: headerService.getLogo(),
          navigation: headerService.getNavigation(),
          userProfile: headerService.getUserProfile(),
        };
      },
      Component: () => {
        const { logo, navigation, userProfile } = useLoaderData<any>();
        return (
          <>
            <header>
              <div>
                {logo}
                {navigation}
              </div>

              <p>My amazing header</p>

              {userProfile}
            </header>
            <Outlet />
          </>
        );
      },
      children: [{
        index: true,
        Component: () => "I am a test module federation"
      }]
    }])
  }
}

export default patchOnNavigation;