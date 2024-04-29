import getPageTitle from "@/utils/get-page-title";
import router from "./router";

import { getToken } from "@/utils/auth"; // progress bar style
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      next();
      NProgress.done();
    } else {
      next();
    }
  } else if (!to.meta.requireAuth) {
    next();
  } else {
    next("/login");
  }
});

router.afterEach(() => {
  NProgress.done();
});
