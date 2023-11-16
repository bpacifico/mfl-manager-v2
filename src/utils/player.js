
export const positions = [
  { name: "GK" },
  { name: "RB"},
  { name: "LB" },
  { name: "CB"},
  { name: "RWB" },
  { name: "LWB" },
  { name: "CDM" },
  { name: "RM" },
  { name: "LM" },
  { name: "CM" },
  { name: "CAM" },
  { name: "RW" },
  { name: "LW" },
  { name: "CF" },
  { name: "ST" },
];

export const scarcity = [
  { name: "Common",		  overallMin: 10, overallMax: 64, color: "#9f9f9f" },
  { name: "Uncommon",   overallMin: 65, overallMax: 74, color: "#71ff30" },
  { name: "Rare",       overallMin: 75, overallMax: 84, color: "#0047ff" },
  { name: "Legendary",  overallMin: 85, overallMax: 99, color: "#fa53ff" },
];

export const getOverallColor = (overall) => {
  for (let i = 0; i < scarcity.length; i++) {
    if (overall <= scarcity[i].overallMax) {
      return scarcity[i].color;
    }
  }

  return "black";
}