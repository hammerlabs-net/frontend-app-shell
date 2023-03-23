// If using local modules, the pilet specification can be hosted inside 
// the component project. In such case, add a file Pilet.jsx to the component
// project with the contents of the local file in this dir, and export that Pilet
// from the index.jsx file so it satisfies the dependencies below
//import { Pilet as HeaderPilet } from '@edx/frontend-component-header';
//import { Pilet as FooterPilet } from '@edx/frontend-component-footer';
import HeaderPilet from './header';
import FooterPilet from './footer';
import LayoutPilet from './layout';

export const availablePilets = [ HeaderPilet, FooterPilet, LayoutPilet ];