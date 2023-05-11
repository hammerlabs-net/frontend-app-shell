// Converted Open edX MFEs and components
import AccountMFEPilet from '@edx/frontend-app-account';
import LearningMFEPilet from '@edx/frontend-app-learning';
import { Pilet as HeaderPilet } from '@edx/frontend-component-header';

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
import OpenEdxFooterPilet from './footer';
import AltFooterPilet from './altFooter';

// Layout Pilets that can be switched dynamically based on URL
import RegLayoutPilet from './layout';
import AltLayoutPilet from './altLayout';

const queryParams = new URLSearchParams(window.location.search);
const useAlt = queryParams.get("alt")?.split(",");
const LayoutPilet = useAlt && useAlt.indexOf('layout') != -1 ? AltLayoutPilet : RegLayoutPilet;
const FooterPilet = useAlt && useAlt.indexOf('footer') != -1 ? AltFooterPilet : OpenEdxFooterPilet;

// This is contrived. In a normal deployment, a more robust strategy can be employed
// to define the list of available pilets for the piral shell to load. Piral recommends
// a feed service, but config files are also possible. 
export const pilets = [ HeaderPilet, FooterPilet, AccountMFEPilet, LearningMFEPilet, LayoutPilet ];
