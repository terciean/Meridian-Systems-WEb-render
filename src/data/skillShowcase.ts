export type SkillVariant = 'mesh' | 'halftone' | 'deco' | 'brutal';

export interface SkillShowcaseItem {
  title: string;
  body: string;
  variant: SkillVariant;
  ascii: string;
}

export const SKILL_SHOWCASE: SkillShowcaseItem[] = [
  {
    variant: 'mesh',
    title: 'Lead follow-up',
    body: 'Every warm enquiry is followed up on time, so no lead goes cold while you are busy with clients.',
    ascii: String.raw`
  _______________
 |_______________|
   \  L E A D S /
    \___________/
      \       /
       \_____/
         |_|
         |_|
        /   \
       /_____/`,
  },
  {
    variant: 'halftone',
    title: 'Meeting alarms',
    body: 'Booked meetings ring on your phone before they start, so nothing gets missed or double-booked.',
    ascii: String.raw`
         _
        (_)
     ___|___
    /   |   \
   /    |    \
  |_____|_____|
     (( o ))
  ~~~~~~~~~~~~~~~
    ~~~~~~~~~~~~`,
  },
  {
    variant: 'deco',
    title: 'Websites',
    body: 'Fast, clear websites that look the part and turn visitors into enquiries.',
    ascii: String.raw`
  .:::::::::::::.
  :  .:::::::.  :
  :  :  [ ]  :  :
  :  '::::::::'  :
  '.::::::::::::.'
     /\/\/\/\/\
    /  /\/\/\  \
   /__/ \/ \__/`,
  },
  {
    variant: 'brutal',
    title: 'Stock and content',
    body: 'Stock levels and content work together, so your whole business stays stocked and in front of people.',
    ascii: String.raw`
  ^
  |        ____
  |   __  |    |
  |  |  | |    |  __
  |  |  | |    | |  |
  +--+--+-+----+-+--+->`,
  },
];
