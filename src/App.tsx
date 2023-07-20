import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  ThemedSiderV2,
  ThemedLayoutV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import "./index.css";
import { GoogleOutlined } from "@ant-design/icons";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { Home } from "./pages/general";
import { CompetePage } from "./pages/compete";

import { Logo } from "./components/Logo";
import { CompetitionList } from "./pages/competitions";
import { CompetitionCreate } from "./pages/competitions/create";
import { CompetitionEdit } from "./pages/competitions/edit";
import { ChallengesList } from "./pages/challenges";
import { CompetitionShow } from "./pages/competitions/show";
import { RefineHackathon } from "./components/RefineHackathon";
import { MenuTop } from "./components/Menu";
import { WatchingList } from "./pages/watching";

const customTitleHandler = () => {
  return "Competee - Become a great challenger";
};

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "competitions",
                list: "/competitions",
                create: "/competitions/create",
                edit: "/competitions/edit/:id",
                show: "/competitions/show/:id",
                meta: {
                  canDelete: false,
                  icon: "🏆",
                },
              },
              {
                name: "challenges",
                list: "/challenges",
                meta: {
                  canDelete: true,
                  icon: "🚀",
                },
              },
              {
                name: "watching",
                list: "/watching",
                meta: {
                  canDelete: true,
                  icon: "👀",
                },
              },
              {
                name: "votes",
                // list: "/votes",
                meta: {
                  canDelete: true,
                  icon: "👍",
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route path="*" element={<ErrorComponent />} />

              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => (
                      <>
                        <RefineHackathon />
                        <MenuTop />
                      </>
                    )}
                    Sider={() => null}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<Home />} />
                <Route path="competition/:slug" element={<CompetePage />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Sider={() => (
                        <ThemedSiderV2
                          Title={() => <Logo />}
                          render={({ items, logout, collapsed }) => {
                            return (
                              <>
                                {items}
                                {logout}
                              </>
                            );
                          }}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="/competitions">
                  <Route index element={<CompetitionList />} />
                  <Route path="create" element={<CompetitionCreate />} />
                  <Route path="edit/:id" element={<CompetitionEdit />} />
                  <Route path="show/:id" element={<CompetitionShow />} />
                </Route>
                <Route path="/challenges">
                  <Route index element={<ChallengesList />} />
                </Route>
                <Route path="/watching">
                  <Route index element={<WatchingList />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={<Logo />}
                      providers={[
                        {
                          name: "google",
                          label: "Sign in with Google",
                          icon: (
                            <GoogleOutlined
                              style={{ fontSize: 18, lineHeight: 0 }}
                            />
                          ),
                        },
                      ]}
                      formProps={{
                        initialValues: {
                          email: "testaccount@test.com",
                          password: "refine-supabase",
                        },
                      }}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" title={<Logo />} />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" title={<Logo />} />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" title={<Logo />} />}
                />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler handler={customTitleHandler} />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
