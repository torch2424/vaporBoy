// File to return a vaporboy logo src

const VAPORBOYS = ["vaporboyarizona", "vaporboybluebeach", "vaporboyvhs"];

let vaporboyLogo = undefined;

export const getVaporBoyLogo = () => {
  if (vaporboyLogo) {
    return vaporboyLogo;
  }

  // Get a vaporboy
  const selectedVaporBoy =
    VAPORBOYS[Math.floor(Math.random() * VAPORBOYS.length)];
  vaporboyLogo = `/assets/vaporboy/512/${selectedVaporBoy}.png`;
  return vaporboyLogo;
};
