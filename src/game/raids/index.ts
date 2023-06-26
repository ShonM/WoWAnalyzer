/* eslint-disable @typescript-eslint/no-var-requires */
import { Spec } from 'game/SPECS';
import { Race } from 'parser/core/Combatant';
import PhaseConfig from 'parser/core/PhaseConfig';

import * as MythicPlusSeasonOne from './mythicplusseasonone';
import * as MythicPlusSeasonTwo from './mythicplusseasontwo';
import * as VaultOfTheIncarnates from './vaultoftheincarnates';
import * as Aberrus from './aberrus';
import * as GruulsLair from './gruulslair';
import * as MagtheridonsLair from './magtheridonslair';
import * as Ulduar from './ulduar';
import * as TrialOfTheGrandCrusader from './trialofthegrandcrusader';

interface EncounterConfig {
  vantusRuneBuffId?: number;
  softMitigationChecks?: {
    physical: [];
    magical: [];
  };
  resultsWarning?: string;
  phases?: { [key: string]: PhaseConfig };
  raceTranslation?: (race: Race, spec?: Spec) => Race;
  disableDeathSuggestion?: boolean;
  disableDowntimeSuggestion?: boolean;
  disableDowntimeStatistic?: boolean;
}
export interface Boss {
  id: number;
  name: string;
  background?: string;
  backgroundPosition?: string;
  headshot?: string;
  icon?: string;
  fight: EncounterConfig;
}
interface Raid {
  bosses: Boss[];
}
export interface Phase extends PhaseConfig {
  start: number[];
  end: number[];
}
export interface Dungeon {
  id: number;
  name: string;
  background?: string;
  backgroundPosition?: string;
  headshot?: string;
  icon?: string;
  fight: unknown;
}

const raids = {
  // Dragonflight
  MythicPlusSeasonOne,
  MythicPlusSeasonTwo,
  VaultOfTheIncarnates,
  Aberrus,
  // The Burning Cursage
  GruulsLair,
  MagtheridonsLair,
  // Wrath of the Lich King (Classic)
  Ulduar,
  TrialOfTheGrandCrusader,
};
export default raids;

export function findByBossId(id: number): Boss | null {
  let boss: Boss | null = null;
  Object.values(raids).some((raid: Raid) => {
    const match = Object.values(raid.bosses).find((boss) => boss.id === id);
    if (match) {
      boss = match;
      return true;
    }
    return false;
  });
  return boss;
}
