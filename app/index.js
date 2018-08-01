import GLOBALS from './globals/globals';

import {Canvas} from './classes/Canvas';
import {Game} from './classes/Game';

let c = new Canvas(document.querySelector('canvas'));
let g = new Game({canvas: c});