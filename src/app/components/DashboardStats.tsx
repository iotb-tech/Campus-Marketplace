type Listing = { price: number; status: "available" | "sold" };

export default function DashboardStats({ listings }: { listings: Listing[] }) {
  const active = listings.filter((l) => l.status === "available");
  const sold = listings.filter((l) => l.status === "sold");
  const earnings = sold.reduce((sum, l) => sum + Number(l.price), 0);

  const stats = [
    { label: "Active Posts", value: active.length },
    { label: "Items Sold", value: sold.length },
    { label: "Total Earnings", value: `₦${earnings.toLocaleString()}` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="border rounded-xl p-5 bg-white shadow-sm">
          <p className="text-sm font-medium text-gray-500">{s.label}</p>
          <p className="text-2xl font-bold mt-1">{s.value}</p>
        </div>
      ))}
    </div>
  );
}