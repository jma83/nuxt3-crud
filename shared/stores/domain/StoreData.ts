import type { Store, StoreDefinition } from "pinia";
import type { StateData } from "~/shared/stores/domain/StateData";
import type { GettersData } from "~/shared/stores/domain/GettersData";
import type { ActionsData } from "~/shared/stores/domain/ActionsData";

export type StoreData = Store<"tasks", StateData, GettersData, ActionsData>;
export type StoreDefinitionData = StoreDefinition<"tasks", StateData, GettersData, ActionsData>;
