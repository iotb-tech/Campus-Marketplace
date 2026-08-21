type Listing = { price: number; status: "available" | "sold" };

export default function DashboardStats({ listings }: { listings: Listing[] }) {
  const active = listings.filter((l) => l.status === "available");
  const sold = listings.filter((l) => l.status === "sold");
  const earnings = sold.reduce((sum, l) => sum + Number(l.price), 0);

  const stats = [
    {
      label: "Active Posts",
      value: active.length,
      sub: `${active.length} active listing${active.length !== 1 ? "s" : ""}`,
      icon: "inventory_2",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      subColor: "text-blue-600",
    },
    {
      label: "Items Sold",
      value: sold.length,
      sub: `${sold.length} sold item${sold.length !== 1 ? "s" : ""}`,
      icon: "shopping_bag",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      subColor: "text-green-600",
    },
    {
      label: "Total Earnings",
      value: `₦${earnings.toLocaleString()}`,
      sub: `From ${sold.length} sale${sold.length !== 1 ? "s" : ""}`,
      icon: "account_balance_wallet",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      subColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="border rounded-xl p-5 bg-white shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
            <span className={`material-symbols-outlined ${s.iconColor}`}>{s.icon}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className={`text-sm ${s.subColor}`}>{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}