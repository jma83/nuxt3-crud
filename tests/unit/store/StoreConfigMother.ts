// @ts-ignore
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { vi } from "vitest";
import StoreStateMother from "~/tests/unit/store/StoreStateMother";

export default class StoreConfigMother {
  public static createDefault(state = StoreStateMother.createDefault()): TestingPinia {
    return createTestingPinia({
      initialState: { tasks: state },
      stubActions: false,
      stubPatch: false,
      createSpy: vi.fn,
    });
  }
}
