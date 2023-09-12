export const navItems = [
    {
      titleKey: "Dashboard",
      iconSrc: "/img/icons/svgDesktop.svg",
      grayscaleKey: "grayscale_desktop",
      effectClass: "hover_effect_desktop",
      href: "/",
      index: 0
    },
    {
      titleKey: "Experiments",
      iconSrc: "/img/icons/svgFlask.svg",
      grayscaleKey: "grayscale_experiment",
      effectClass: "hover_effect_flask",
      href: "/experiments",
      index: 1
    },
    {
      titleKey: "Games",
      iconSrc: "/img/icons/svgAlien.svg",
      grayscaleKey: "grayscale_game",
      effectClass: "hover_effect_alien",
      href: "/games",
      index: 2
    },
    {
      titleKey: "Profile",
      iconSrc: "/img/icons/svgProfile.svg",
      grayscaleKey: "grayscale_profile",
      effectClass: "hover_effect_profile",
      href: "/user_form",
      index: 3
    },
    {
      titleKey: "Information",
      iconSrc: "/img/icons/svgInfo.svg",
      grayscaleKey: "grayscale_info",
      effectClass: "hover_effect_info",
      href: "#",
      index: 4
    },
    {
      titleKey: "Messages",
      iconSrc: "/img/icons/svgEnvelope.svg",
      grayscaleKey: "grayscale_message",
      effectClass: "hover_effect_envelope",
      href: "#",
      index: 5
    },
    {
      titleKey: "Logout",
      iconSrc: "/img/icons/svgPower.svg",
      grayscaleKey: "grayscale_logout",
      effectClass: "hover_effect_power",
      href: "#",
      index: 6,
      specialAction: true // To denote this requires special action for logout
    }
  ];
  