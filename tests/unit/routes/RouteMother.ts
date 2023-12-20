import { type RouteLocationNormalized as Route } from "vue-router";

export default class RouteMother {
  public static createDefaultRoute(): Route {
    return {
      path: "/",
      query: {},
      matched: [],
      hash: "",
      params: {},
      fullPath: "/",
      name: "",
      redirectedFrom: undefined,
      meta: {},
    };
  }
}
