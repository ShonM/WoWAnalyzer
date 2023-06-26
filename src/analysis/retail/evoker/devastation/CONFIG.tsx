import { Tyndi, Vireve } from 'CONTRIBUTORS';
import Expansion from 'game/Expansion';
import SPECS from 'game/SPECS';
import Config from 'parser/Config';

import CHANGELOG from './CHANGELOG';

const config: Config = {
  // The people that have contributed to this spec recently. People don't have to sign up to be long-time maintainers to be included in this list. If someone built a large part of the spec or contributed something recently to that spec, they can be added to the contributors list. If someone goes MIA, they may be removed after major changes or during a new expansion.
  contributors: [Vireve, Tyndi],
  expansion: Expansion.Dragonflight,
  // The WoW client patch this spec was last updated.
  patchCompatibility: '10.1.0',
  isPartial: false,
  // Explain the status of this spec's analysis here. Try to mention how complete it is, and perhaps show links to places users can learn more.
  // If this spec's analysis does not show a complete picture please mention this in the `<Warning>` component.
  description: (
    <>
      <p>
        Hello, and welcome to the Devastation Analyzer! This analyzer is maintained by{' '}
        <code>Vireve</code> , a former priest who's loving the new class!
      </p>
      <p>
        If you have questions about the output or want to help contribute, please hit me up in the{' '}
        <code>#devastation</code> channel of the{' '}
        <a href="http://discord.gg/https://discord.gg/evoker">Wyrmrest Temple</a>.
      </p>
    </>
  ),
  // A recent example report to see interesting parts of the spec. Will be shown on the homepage.
  exampleReport: '/report/7aMydgXf319RnwVt/5-Normal+Terros+-+Kill+(4:36)/Vorgon/standard',

  // Don't change anything below this line;
  // The current spec identifier. This is the only place (in code) that specifies which spec this parser is about.
  spec: SPECS.DEVASTATION_EVOKER,
  // The contents of your changelog.
  changelog: CHANGELOG,
  // The CombatLogParser class for your spec.
  parser: () =>
    import('./CombatLogParser' /* webpackChunkName: "DevastationEvoker" */).then(
      (exports) => exports.default,
    ),
  // The path to the current directory (relative form project root). This is used for generating a GitHub link directly to your spec's code.
  path: new URL('', import.meta.url).pathname,
  guideDefault: true,
};

export default config;
