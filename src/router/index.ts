import Layout from '@layout/index';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        lazy: async () => {
          const { default: Component } = await import('@pages/Home/index');
          return { Component };
        },
      },
      {
        path: '/skill',
        lazy: async () => {
          const { default: Component } = await import('@pages/Skill/index');
          return { Component };
        },
      },
      {
        path: '/test',
        lazy: async () => {
          const { default: Component } = await import('@pages/Test/index');
          return { Component };
        },
      },
      {
        path: '/site',
        lazy: async () => {
          const { default: Component } = await import('@pages/Site/index');
          return { Component };
        },
      },
      {
        path: '/statistics',
        lazy: async () => {
          const { default: Component } = await import('@pages/Statistics/index');
          return { Component };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { default: Component } = await import('@pages/404/404');
          return { Component };
        },
      },
    ],
  },
]);

export default router;
