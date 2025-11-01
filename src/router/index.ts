import { createBrowserRouter } from "react-router";
import SkillPage from "../pages/Skill/index";
import AboutPage from "../pages/About/index";
import HomePage from "../pages/Home/index";
import TestPage from "../pages/Test/index";
import NotFoundPage from "../pages/404/404";
import SitePage from "../pages/Site/index";
import Layout from "../layout/index";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/skill",
        Component: SkillPage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/test",
        Component: TestPage,
      },
      {
        path: "/site",
        Component: SitePage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;
