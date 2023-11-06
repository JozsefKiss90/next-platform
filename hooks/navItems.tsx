import { NavItems } from "../types/types";

export const navItems :NavItems[] = [
  {
    titleKey: 'Dashboard',
    path: '/',
    iconPath: '/img/icons/svgDesktop.svg',
    grayscaleKey: 'grayscale_desktop',
    hoverEffectClass: 'hover_effect_desktop',
    iconWidth: 50,
    iconHeight: 50
  },
  {
    titleKey: 'Experiments',
    path: '/experiments',
    iconPath: '/img/icons/svgFlask.svg',
    grayscaleKey: 'grayscale_experiment',
    hoverEffectClass: 'hover_effect_flask',
    iconWidth: 50,
    iconHeight: 50
  },
  {
    titleKey: 'Games',
    path: '/games',
    iconPath: '/img/icons/svgAlien.svg',
    grayscaleKey: 'grayscale_game',
    hoverEffectClass: 'hover_effect_alien',
    iconWidth: 50,
    iconHeight: 40
  },
  {
    titleKey: 'Profile',
    path: '/user_form',
    iconPath: '/img/icons/svgProfile.svg',
    grayscaleKey: 'grayscale_profile',
    hoverEffectClass: 'hover_effect_profile',
    iconWidth: 50,
    iconHeight: 40
  },
  {
    titleKey: 'Information',
    path: '/information',
    iconPath: '/img/icons/svgInfo.svg',
    grayscaleKey: 'grayscale_info',
    hoverEffectClass: 'hover_effect_info',
    iconWidth: 50,
    iconHeight: 50
  },
  {
    titleKey: 'Messages',
    path: '/contact',
    iconPath: '/img/icons/svgEnvelope.svg',
    grayscaleKey: 'grayscale_message',
    hoverEffectClass: 'hover_effect_envelope',
    iconWidth: 50,
    iconHeight: 40
  },
  {
    titleKey: 'Logout',
    path: '#',
    iconPath: '/img/icons/svgPower.svg',
    grayscaleKey: 'grayscale_logout',
    hoverEffectClass: 'hover_effect_power',
    iconWidth: 45,
    iconHeight: 45,
    signOut: true
  }
];