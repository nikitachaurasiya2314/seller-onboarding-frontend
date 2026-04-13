export interface AccountInfo {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ShopDetails {
  shopName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}

export interface TaxInfo {
  hasGst: boolean;
  gstin: string;
  eid: string;
  pan?: string;
}

export interface Compliance {
  turnoverDeclaration: boolean;
  intraStateDeclaration: boolean;
  termsAccepted: boolean;
}

export interface SellerFormData {
  account: AccountInfo;
  shop: ShopDetails;
  tax: TaxInfo;
  compliance: Compliance;
}

export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export interface LocationData {
  address: string;
  city: string;
  state: string;
  pin: string;
}

// ─── Dashboard Data Types ───────────────────────────────────────────────────

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

export interface MetricCard {
  id: string;
  label: string;
  value: number;
  subtext: string;
  subtextVariant: "error" | "neutral" | "success" | "warning";
  icon: string;
}

export interface Task {
  id: string;
  priority: "urgent" | "high" | "normal" | "low";
  category: string;
  ref: string;
  title: string;
  meta: string;
  metaHighlight?: string;
  metaHighlightColor?: "error" | "neutral" | "success" | "warning";
  ctaLabel: string;
}

export interface SLABreach {
  id: string;
  seller: string;
  orderRef: string;
  type: string;
  time: string;
  status: "Critical" | "Alert" | string;
}

export interface DisputeBreakdown {
  status: string;
  count: number;
  color: string;
  total: number;
}

export interface ContentItem {
  id: string;
  type: string;
  creator: string;
  followers: string;
  reason: string;
  reports: number;
  reportedAt: string;
  isHighReports?: boolean;
}

export interface PulseItem {
  id: string;
  isHighlighted?: boolean;
  tag?: string;
  message: string;
  time: string;
}
