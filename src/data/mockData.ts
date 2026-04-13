import type {
  MetricCard,
  Task,
  SLABreach,
  DisputeBreakdown,
  ContentItem,
  PulseItem,
  NavItem,
} from "../types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "#", active: true },
  // { label: "Orders", icon: "shopping_cart", href: "#" },
  // { label: "Disputes", icon: "gavel", href: "#" },
  // { label: "Returns & Replacements", icon: "assignment_return", href: "#" },
  // { label: "Sellers", icon: "storefront", href: "#" },
  // { label: "SLA Breaches", icon: "warning", href: "#" },
  // { label: "Content Moderation", icon: "security", href: "#" },
  // { label: "Live Sessions", icon: "live_tv", href: "#" },
  // { label: "Group Deals", icon: "groups", href: "#" },
  // { label: "Finance", icon: "payments", href: "#" },
];

export const METRICS: MetricCard[] = [
  {
    id: "disputes",
    label: "Open Disputes",
    value: 7,
    subtext: "3 need response today",
    subtextVariant: "error",
    icon: "gavel",
  },
  {
    id: "sla",
    label: "SLA Breaches Today",
    value: 12,
    subtext: "+14% vs yesterday",
    subtextVariant: "neutral",
    icon: "speed",
  },
  {
    id: "flagged",
    label: "Content Flagged",
    value: 23,
    subtext: "Pending Review",
    subtextVariant: "neutral",
    icon: "flag",
  },
  {
    id: "returns",
    label: "Returns Pending",
    value: 9,
    subtext: "Awaiting QC",
    subtextVariant: "neutral",
    icon: "cached",
  },
];

export const TASKS: Task[] = [
  {
    id: "t1",
    priority: "urgent",
    category: "Dispute",
    ref: "Dispute #D-2847",
    title: 'Buyer claims non-delivery of "Handmade Juttis"',
    meta: "Time left: ",
    metaHighlight: "2hrs",
    metaHighlightColor: "error",
    ctaLabel: "Respond",
  },
  {
    id: "t2",
    priority: "urgent",
    category: "Merchant SLA",
    ref: "Merchant SLA",
    title: 'Seller "Craft Kart" has not confirmed Order #1029',
    meta: "Auto-cancel in ",
    metaHighlight: "6hrs",
    metaHighlightColor: "neutral",
    ctaLabel: "View Order",
  },
  {
    id: "t3",
    priority: "high",
    category: "Moderation",
    ref: "Moderation",
    title: "Flagged reel by @priya_creates — misleading product claim",
    meta: "Reported by 12 users",
    ctaLabel: "Review",
  },
  {
    id: "t4",
    priority: "high",
    category: "Return",
    ref: "Return #R-192",
    title: "Seller not responded to return request — ₹12,499 value",
    meta: "SLA expires in ",
    metaHighlight: "12hrs",
    metaHighlightColor: "neutral",
    ctaLabel: "View Return",
  },
  {
    id: "t5",
    priority: "normal",
    category: "Group Deal",
    ref: "Group Deal #GD-88",
    title: "Expires in 4hrs, only 3/10 slots filled — Potential loss",
    meta: "Requires push notification boost",
    ctaLabel: "View Deal",
  },
];

export const SLA_BREACHES: SLABreach[] = [
  { id: "s1", seller: "Vastra Art", orderRef: "#1055", type: "Dispatch", time: "45m", status: "Critical" },
  { id: "s2", seller: "Indie Blooms", orderRef: "#1082", type: "Confirm", time: "1.2h", status: "Critical" },
  { id: "s3", seller: "Jaipur Threads", orderRef: "#1099", type: "Confirm", time: "2.5h", status: "Alert" },
  { id: "s4", seller: "Pottery Hub", orderRef: "#1104", type: "Dispatch", time: "3.1h", status: "Alert" },
  { id: "s5", seller: "Ethnic Soul", orderRef: "#1112", type: "Confirm", time: "5.8h", status: "Alert" },
];

export const DISPUTE_BREAKDOWN: DisputeBreakdown[] = [
  { status: "Open", count: 7, color: "#b0004a", total: 57 },
  { status: "Awaiting Seller", count: 4, color: "#171717", total: 57 },
  { status: "Awaiting Buyer", count: 3, color: "#6b7280", total: 57 },
  { status: "Escalated", count: 2, color: "#f9a8d4", total: 57 },
  { status: "Resolved", count: 41, color: "#e5e7eb", total: 57 },
];

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: "c1",
    type: "Reel",
    creator: "@rohit_vlogs",
    followers: "2.4M followers",
    reason: 'Misleading product claims — "Miracle Skin Serum"',
    reports: 42,
    reportedAt: "Today, 09:12 AM",
    isHighReports: true,
  },
  {
    id: "c2",
    type: "Post",
    creator: "@anjali_style",
    followers: "120K followers",
    reason: "Duplicate content — copying @vogue_india asset",
    reports: 8,
    reportedAt: "Today, 10:45 AM",
  },
  {
    id: "c3",
    type: "Reel",
    creator: "@tech_kabir",
    followers: "890K followers",
    reason: "Spam / Multiple Affiliate Links in Bio",
    reports: 15,
    reportedAt: "Yesterday, 11:20 PM",
  },
  {
    id: "c4",
    type: "Post",
    creator: "@deepak_eats",
    followers: "45K followers",
    reason: "Nudity / Policy Violation in background",
    reports: 21,
    reportedAt: "Today, 06:15 AM",
    isHighReports: true,
  },
  {
    id: "c5",
    type: "Reel",
    creator: "@meera_official",
    followers: "3.1M followers",
    reason: "Scam / Unverified Giveaway link",
    reports: 54,
    reportedAt: "Yesterday, 08:30 PM",
  },
];

export const PULSE_ITEMS: PulseItem[] = [
  {
    id: "p1",
    isHighlighted: true,
    tag: "New Notification",
    message: '@priya_creates uploaded a sponsored Reel for "Craft Kart"',
    time: "2m ago",
  },
  {
    id: "p2",
    message: 'Order #1124 confirmed by seller "Fab India"',
    time: "15m ago",
  },
  {
    id: "p3",
    isHighlighted: true,
    tag: "Escalation",
    message: "Dispute #D-2847 high priority response required",
    time: "45m ago",
  },
  {
    id: "p4",
    message: 'Seller "Pottery Hub" updated inventory for 12 items',
    time: "1h ago",
  },
  {
    id: "p5",
    message: "System Update: Scheduled maintenance at 02:00 AM",
    time: "3h ago",
  },
];
