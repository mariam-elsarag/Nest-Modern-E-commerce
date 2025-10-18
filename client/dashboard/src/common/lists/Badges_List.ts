export const orderStatusBadge = (data) => {
  switch (data) {
    case "pending":
      return { text: "pending", type: "pending" };
    case "completed":
      return { text: "completed", type: "success" };
    case "shipped":
      return { text: "shipped", type: "primary" };
    case "cancelled":
      return { text: "cancelled", type: "error" };
    default:
      return { text: data, type: "default" };
  }
};

export const userStatusBadge = (data) => {
  switch (data) {
    case "pending":
      return { text: "pending", type: "pending" };
    case "blocked":
      return { text: "blocked", type: "error" };
    default:
      return { text: "active", type: "default" };
  }
};

export const productAvaliblityBadge = (data) => {
  if (data) {
    return { text: "avalible", type: "success" };
  } else {
    return { text: "unavalible", type: "error" };
  }
};
