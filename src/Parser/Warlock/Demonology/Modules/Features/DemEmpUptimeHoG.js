import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';

import {formatPercentage} from 'common/format';
import StatisticBox from 'Main/StatisticBox';
import SpellIcon from 'common/SpellIcon';

const IMP_DURATION = 12;
const MILLISECONDS = 1000;

class DemEmpUptimeHoG extends Analyzer{
  unEmpoweredHogs = [];
  hogCasts = 0;
  totalEmpoweredTime = 0;

  get uptime(){
    return this.totalEmpoweredTime / (this.hogCasts * IMP_DURATION * MILLISECONDS);
  }

  get suggestionThresholds(){
    return {
      actual: this.uptime,
      isLessThan: {
        minor: 0.95,
        average: 0.9,
        major: 0.8,
      },
      style: 'percentage',
    };
  }

  on_byPlayer_cast(event){
    const spellId = event.ability.guid;
    if(spellId === SPELLS.HAND_OF_GULDAN_CAST.id){
      this.hogCasts += 1;
      this.unEmpoweredHogs.push(event.timestamp);
    } else if (spellId === SPELLS.DEMONIC_EMPOWERMENT.id){
      for(const i in this.unEmpoweredHogs){
        const hog = this.unEmpoweredHogs[i];
        if(event.timestamp - hog <= IMP_DURATION * MILLISECONDS){ //Imps are still active from this HandOfGuldan cast.
          const timeDelta = (IMP_DURATION * MILLISECONDS) - (event.timestamp - hog) + (1.5 * MILLISECONDS);//Add an extra 1.5s to compensate for the delay between HoG cast and imp spawn.
          this.totalEmpoweredTime += timeDelta;
        }
      }
      this.unEmpoweredHogs = [];
    }
  }

  suggestions(when){
    when(this.suggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(
          <React.Fragment>Empowerment of <SpellLink id={SPELLS.HAND_OF_GULDAN_CAST.id} icon/> can be improved. Remember to always empower demons immediately after summoning.</React.Fragment>
        ).icon(SPELLS.HAND_OF_GULDAN_CAST.icon)
          .actual(`${formatPercentage(actual)}% empowered uptime.`)
          .recommended(`>${formatPercentage(recommended)}% is recommended.`);
      });
  }

  statistic(){
    return(
      <StatisticBox icon={<SpellIcon id={SPELLS.HAND_OF_GULDAN_CAST.id}/>} value={`${formatPercentage(this.uptime)} %`} label={'Empowered Hand of Gul\'dan Uptime'} />
    );
  }

}

export default DemEmpUptimeHoG;
