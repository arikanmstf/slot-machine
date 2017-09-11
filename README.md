# Slot Machine

## Developer Guide

* You must use node version 7 stable.
* You might want to install nvm to choice node version easily.

```
	> cd slot-machine
	> nvm use 7
	> npm install
	> npm run dev
```
* open http://localhost:8080/ on your Chrome browser.
* To edit chance to win, edit: `TOP_FIXED_CHANCE` at `SlotConstants.js`
* To add or remove Symbols, edit `SLOT_SYMBOL_TYPES` at `SlotConstants.js`
* To edit spinning delay times of machine, edit `SPIN_DELAY` and `SPIN_EACH_STOP_DELAY` at `SlotConstants.js`
* To add more rules to win, edit `PAY_TYPES` at `PayTableConstants.js`
* To edit bet of each spin, edit `SPIN_BET` at `BalanceConstants.js`
* To edit spin speed, edit `spinDuration` at `slot-machine.scss`

* To add some action on user win, edit `onWin` function at `BalanceText.js`

## User Guide

* Click the SPIN button
* If all of the symbols are through the guide lines of the machine and the
described win happen, your balance should be updated
* If you want to reset the game, refresh the page.
* Demo available at: http://mustafaarikan.net/slot-machine
