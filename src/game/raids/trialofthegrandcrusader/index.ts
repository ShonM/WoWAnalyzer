/* eslint-disable @typescript-eslint/no-var-requires */

import * as NorthrendBeasts from './NorthrendBeasts';
import * as LordJaraxxus from './LordJaraxxus';
import * as FactionChampions from './FactionChampions';
import * as ValkyrTwins from './ValkyrTwins';
import * as Anubarak from './Anubarak';

export default {
  name: 'Trial of the Grand Crusader', // T9
  bosses: {
    NorthrendBeasts,
    LordJaraxxus,
    FactionChampions,
    ValkyrTwins,
    Anubarak,
  },
};
