// File to return a vaporboy logo src

const VAPORBOYS = [
  "vaporboyarizona.png",
  "vaporboybluebeach.png",
  "vaporboyvhs.png"
];

let vaporboyLogo = undefined;

export const getVaporBoyLogo = () => {
  if (vaporboyLogo) {
    return vaporboyLogo;
  }

  // Get a vaporboy
  const selectedVaporBoy =
    VAPORBOYS[Math.floor(Math.random() * VAPORBOYS.length)];
  vaporboyLogo = `/assets/vaporboy/512/${selectedVaporBoy}`;
  return vaporboyLogo;
};
