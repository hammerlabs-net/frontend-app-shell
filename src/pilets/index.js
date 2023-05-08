// If using local modules, the pilet specification can be hosted inside 
// the component project. In such case, add a file Pilet.jsx to the component
// project with the contents of the local file in this dir, and export that Pilet
// from the index.jsx file so it satisfies the dependencies below
import { Pilet as HeaderPilet } from '@edx/frontend-component-header';
//import { Pilet as FooterPilet } from '@edx/frontend-component-footer';
//import HeaderPilet from './header';
import FooterPilet from './footer';
import RegLayoutPilet from './layout';
import AltLayoutPilet from './altLayout';

import AccountMFEPilet from '@edx/frontend-app-account';
import LearningMFEPilet from '@edx/frontend-app-learning';

const queryParams = new URLSearchParams(window.location.search);

const useAlt = queryParams.get("alt");

const layoutPilet = useAlt ? AltLayoutPilet : RegLayoutPilet;

export const pilets = [ HeaderPilet, FooterPilet, AccountMFEPilet, LearningMFEPilet, layoutPilet ];
