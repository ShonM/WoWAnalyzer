/* eslint-disable @typescript-eslint/no-var-requires */
import Ulduar from './images/Ulduar.jpg';

import * as FlameLeviathan from './FlameLeviathan';
import * as Ignis from './Ignis';
import * as Razorscale from './Razorscale';
import * as XT002 from './XT002';
import * as IronCouncil from './IronCouncil';
import * as Kologarn from './Kologarn';
import * as Auriaya from './Auriaya';
import * as Hodir from './Hodir';
import * as Thorim from './Thorim';
import * as Freya from './Freya';
import * as Mimiron from './Mimiron';
import * as GeneralVezax from './GeneralVezax';
import * as YoggSaron from './YoggSaron';
import * as Algalon from './Algalon';

export default {
  name: 'Ulduar', // T8
  background: Ulduar,
  bosses: {
    FlameLeviathan,
    Ignis,
    Razorscale,
    XT002,
    IronCouncil,
    Kologarn,
    Auriaya,
    Hodir,
    Thorim,
    Freya,
    Mimiron,
    GeneralVezax,
    YoggSaron,
    Algalon,
  },
};
