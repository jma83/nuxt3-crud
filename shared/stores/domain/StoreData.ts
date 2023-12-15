import type { StoreDefinition } from "pinia";
import type { StateData } from "~/shared/stores/domain/StateData";
import type { GettersData } from "~/shared/stores/domain/GettersData";
import type { ActionsData } from "~/shared/stores/domain/ActionsData";

export type StoreData = StoreDefinition<"tasks", StateData, GettersData, ActionsData>;
