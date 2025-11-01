export enum UserRole {
  ADMIN = 'admin',
  User = 'user',
}

export enum AccountStatus {
  Pending = 'pending',
  Active = 'active',
  Blocked = 'blocked',
}
export enum StockStatus {
  InStock = 'inStock',
  OutOfStock = 'outOfStock',
  LittleAmount = 'littleAmount',
}

// ticket-status.enum.ts
export enum TicketStatus {
  Open = 'open',
  InProgress = 'inProgress',
  Replied = 'replied',
  Solved = 'solved',
  Closed = 'closed',
}

export enum PaymentStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
}

export enum PaymentMethod {
  Cash = 'cash',
  Gateway = 'gateway',
}

export enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}
