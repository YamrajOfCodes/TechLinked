const getTier = (points: number) => {
  if (points >= 900) {
    return {
      label: "Platinum",
      color: "#6ea8ff",
    };
  }

  if (points >= 650) {
    return {
      label: "Gold",
      color: "#ffb84d",
    };
  }

  if (points >= 400) {
    return {
      label: "Silver",
      color: "#A9B4BE",
    };
  }

  return {
    label: "Bronze",
    color: "#C08552",
  };
}

export default getTier;