import { getAbilities as getUserAbilities } from "./user/abilities";
import { getAbilities as getOrganisationAbilities } from "./organisation/abilities";
import { getAbilities as getAssetAbilities } from "./asset/abilities";

export const getAbilities = [
    getUserAbilities,
    getOrganisationAbilities,
    getAssetAbilities,
];