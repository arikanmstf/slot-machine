/*
 * If you want to add new symbol,
 * all you have to do is add one more Object here
 * with valid url and name
 */

export const SLOT_SYMBOL_TYPES = [
  {
    name: '3xBAR',
    url: 'static/images/3xBAR.png',
    index: 0
  },
  {
    name: 'BAR',
    url: 'static/images/BAR.png',
    index: 1
  },
  {
    name: '2xBAR',
    url: 'static/images/2xBAR.png',
    index: 2
  },
  {
    name: '7',
    url: 'static/images/7.png',
    index: 3
  },
  {
    name: 'Cherry',
    url: 'static/images/Cherry.png',
    index: 4
  }
];

export const SPIN_DELAY = 2000; // 2 seconds

export const SPIN_EACH_STOP_DELAY = 500; // delay between the reels to stop

export const TOP_FIXED_CHANCE = 2; //  higher value, less chance: 2 => 1/8, 3 => 1/27, 4 => 1/64
