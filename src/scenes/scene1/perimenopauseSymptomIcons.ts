import type { KmiFieldKey } from './kmiRules';

import fatigueIcon from '../../assets/perimenopause-kmi-icons/fatigue.png';
import formicationIcon from '../../assets/perimenopause-kmi-icons/formication.png';
import headacheIcon from '../../assets/perimenopause-kmi-icons/headache.png';
import hotFlashesIcon from '../../assets/perimenopause-kmi-icons/hot-flashes.png';
import insomniaIcon from '../../assets/perimenopause-kmi-icons/insomnia.png';
import jointPainIcon from '../../assets/perimenopause-kmi-icons/joint-pain.png';
import melancholiaIcon from '../../assets/perimenopause-kmi-icons/melancholia-alt.png';
import nervousnessIcon from '../../assets/perimenopause-kmi-icons/nervousness.png';
import palpitationsIcon from '../../assets/perimenopause-kmi-icons/palpitations-alt.png';
import paresthesiaIcon from '../../assets/perimenopause-kmi-icons/paresthesia.png';
import sexualImpactIcon from '../../assets/perimenopause-kmi-icons/sexual-impact.png';
import urinarySymptomsIcon from '../../assets/perimenopause-kmi-icons/urinary-symptoms.png';
import vertigoIcon from '../../assets/perimenopause-kmi-icons/vertigo-alt.png';

export const perimenopauseSymptomIconMap: Record<KmiFieldKey, string> = {
  kmiHotFlashes: hotFlashesIcon,
  kmiParesthesia: paresthesiaIcon,
  kmiInsomnia: insomniaIcon,
  kmiNervousness: nervousnessIcon,
  kmiMelancholia: melancholiaIcon,
  kmiVertigo: vertigoIcon,
  kmiFatigue: fatigueIcon,
  kmiJointPain: jointPainIcon,
  kmiHeadache: headacheIcon,
  kmiPalpitations: palpitationsIcon,
  kmiFormication: formicationIcon,
  kmiSexualImpact: sexualImpactIcon,
  kmiUrinarySymptoms: urinarySymptomsIcon,
};
