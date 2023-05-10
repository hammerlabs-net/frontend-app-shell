// Converted Open edX MFEs and components
import AccountMFEPilet from '@edx/frontend-app-account';
import LearningMFEPilet from '@edx/frontend-app-learning';
import { Pilet as HeaderPilet } from '@edx/frontend-component-header';

// Note how existing components can be wrapped externally into a pilet by simply providing
// the necessary lifecycle method
//import HeaderPilet from './header';
import FooterPilet from './footer';

// Layout Pilets that can be switched dynamically based on URL
import RegLayoutPilet from './layout';
import AltLayoutPilet from './altLayout';

const queryParams = new URLSearchParams(window.location.search);
const useAlt = queryParams.get("alt");
const layoutPilet = useAlt ? AltLayoutPilet : RegLayoutPilet;

// This is contrived. In a normal deployment, a more robust strategy can be employed
// to define the list of available pilets for the piral shell to load. Piral recommends
// a feed service, but config files are also possible. 
export const pilets = [ HeaderPilet, FooterPilet, AccountMFEPilet, LearningMFEPilet, layoutPilet ];
