// Converted Open edX MFEs and components
//import AccountMFEPilet from './account';
//import LearningMFEPilet from './learning';
//import HeaderPilet from './header';

/* Customizing Pilet loading
 *
 * Below we see two methods to dynamically swap UI elements via
 * a pilet loading strategy.
 * 
 * In the first example, we load two alternative footer pilets. These pilets
 * are extensions that satisfy the slot 'openedx-footer'. Both layouts below
 * declare a 'openedx-footer' slot. The urlswith alt=footer will dynamically
 * switch between which footer is loaded to fill the slot.
 * 
 * In the second example, an entirely different layout is loaded, allowing a lot
 * more flexibility over the DOM, including adding an entirely new sidebar. The 
 * urlswitch alt=layout will activate this alternative layout. 
 * 
 * Note that both switches can be combined. 
 * 
 * alt=layout,footer
 */
// Footer Extension Pilets that can be switched dynamically based on URL
//import OpenEdxFooterPilet from './footer';
//import AltFooterPilet from './altFooter';

// Layout Pilets that can be switched dynamically based on URL
import RegLayoutPilet from './layout';
import AltLayoutPilet from './altLayout';
import AltFooterPilet from './altFooter';

const queryParams = new URLSearchParams(window.location.search);
const useAlt = queryParams.get("alt")?.split(",");
const LayoutPilet = useAlt && useAlt.indexOf('layout') != -1 ? AltLayoutPilet : RegLayoutPilet;



export const pilets = [LayoutPilet, AltFooterPilet];
