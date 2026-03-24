import { Outlet, PatchRoutesOnNavigationFunctionArgs, useLoaderData } from "react-router";

const patchOnNavigation = async function patchOnNavigation(
  {
    patch,
    path,
  }: PatchRoutesOnNavigationFunctionArgs,
  { ctx }: { ctx: any }
) {
  if (path.startsWith('/test')) {
    patch(null, [{
      path: '/test',
      async loader() {
        const headerService = ctx.get('header-components-service');

        const [logoResult, navigationResult, userProfileResult] = await Promise.allSettled([
          headerService.getLogo(),
          headerService.getNavigation(),
          headerService.getUserProfile(),
        ]);

        return {
          logo: logoResult.status === 'fulfilled' ? logoResult.value : 'Logo could not be loaded',
          navigation: navigationResult.status === 'fulfilled' ? navigationResult.value : 'Navigation could not be loaded',
          userProfile: userProfileResult.status === 'fulfilled' ? userProfileResult.value : 'User profile could not be loaded',
        };
      },
      Component: () => {
        const { logo, navigation, userProfile } = useLoaderData<any>();
        return (
          <>
            <header>
              <div>
                <div style={{ border: '2px solid blue' }}>{logo}</div>
                <div style={{ border: '2px solid blue' }}>{navigation}</div>
              </div>

              <p>My amazing header</p>

              <div style={{ border: '2px solid blue' }}>{userProfile}</div>
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