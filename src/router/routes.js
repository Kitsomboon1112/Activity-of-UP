const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/home",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/TestPage.vue"),
      },
    ],
  },

  {
    path: "/index",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  {
    path: "/test",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CalenderPage.vue"),
      },
    ],
  },

  {
    path: "/Profile",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ProfilePage.vue"),
      },
    ],
  },

  {
    path: "/list",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ListPage.vue"),
      },
    ],
  },
  {
    path: "/activity/:id",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ActivityDetails.vue"),
        props: true,
      },
    ],
  },

  {
    path: "/post",
    component: () => import("layouts/AdminLayout.vue"),
    props: true,
    children: [
      {
        path: "",
        component: () => import("pages/PostPage.vue"),
      },
    ],
  },

  {
    path: "/index2",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/index2Page.vue"),
      },
    ],
  },

  {
    path: "/download",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/ActivityView.vue"),
      },
    ],
  },

  {
    path: "/aa",
    component: () => import("layouts/AdminLayout.vue"),
    props: true,
    children: [
      {
        path: "",
        component: () => import("pages/AA.vue"),
      },
    ],
  },

  {
    path: "/mail",
    component: () => import("layouts/AdminLayout.vue"),
    props: true,
    children: [
      {
        path: "",
        component: () => import("pages/Email.vue"),
      },
    ],
  },
];

export default routes;
