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
export const supportTicketStatusBadge = (data) => {
  switch (data) {
    case "inProgress":
      return { text: "inProgress", type: "pending" };
    case "solved":
      return { text: "solved", type: "success" };
    case "replied":
      return { text: "replied", type: "primary" };
    case "close":
      return { text: "close", type: "error" };
    default:
      return { text: data, type: "default" };
  }
};
export const readSupportTicketBadgeList = (data) => {
  switch (data) {
    case true:
      return { text: "read", type: "success" };
    default:
      return { text: "unread", type: "default" };
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
