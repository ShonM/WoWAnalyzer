/* eslint-disable @typescript-eslint/no-var-requires */
import GruulsLair from './images/GruulsLair.jpg';

import * as HighKingMaulgar from './HighKingMaulgar';
import * as Gruul from './Gruul';

export default {
  name: "Gruul's Lair", // T4
  background: GruulsLair,
  bosses: {
    HighKingMaulgar,
    Gruul,
  },
};
