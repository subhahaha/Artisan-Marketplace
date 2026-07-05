import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getMockMonthlySales } from "../data/mockSales";

export default function SellerStats({ sellerProducts }) {
  const monthlySales = getMockMonthlySales(sellerProducts);

  const totalListings = sellerProducts.length;
  const inventoryValue = sellerProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );
  const totalRevenue = monthlySales.reduce((sum, m) => sum + m.revenue, 0);

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Active listings" value={totalListings} />
        <StatCard
          label="Inventory value"
          value={`Rs. ${inventoryValue.toLocaleString()}`}
        />
        <StatCard
          label="Last 6 months revenue"
          value={`Rs. ${totalRevenue.toLocaleString()}`}
        />
      </div>

      <div className="bg-white/60 border border-ink/10 rounded-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-display text-lg text-ink">Monthly revenue</p>
          <p className="text-xs text-ink-soft italic">
            Simulated data — no live orders yet
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#23232314" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#5C5650", fontSize: 12 }}
              axisLine={{ stroke: "#23232320" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#5C5650", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              formatter={(value) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
              contentStyle={{
                background: "#FAF6EF",
                border: "1px solid #23232320",
                borderRadius: "2px",
                fontFamily: "Work Sans, sans-serif",
              }}
            />
            <Bar dataKey="revenue" fill="#D9A441" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white/60 border border-ink/10 rounded-sm p-4">
      <p className="text-xs text-ink-soft mb-1">{label}</p>
      <p className="font-mono text-xl text-plum font-medium">{value}</p>
    </div>
  );
}