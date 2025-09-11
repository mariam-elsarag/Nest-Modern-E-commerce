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
