import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ChartDataPoint {
  date: string;
  price: number;
  volume: number;
}

interface StockChartProps {
  chartData: ChartDataPoint[];
  companyName: string;
}

const chartConfig = {
  price: {
    label: "Prezzo",
    color: "#2563eb",
  },
} as const;

export function StockChart({ chartData, companyName }: StockChartProps) {
  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Grafico Storico - {companyName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Nessun dato disponibile per il grafico
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format data for the chart
  const formattedData = chartData.map(point => ({
    ...point,
    formattedDate: new Date(point.date).toLocaleDateString('it-IT', {
      month: 'short',
      day: 'numeric'
    }),
    price: Number(point.price.toFixed(2))
  }));

  // Calculate price change
  const firstPrice = chartData[0]?.price || 0;
  const lastPrice = chartData[chartData.length - 1]?.price || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Grafico Storico - {companyName}</CardTitle>
          <div className="text-right">
            <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)} USD
            </div>
            <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%) ultimi 30 giorni
            </div>
          </div>
        </div>
      </CardHeader>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis 
                dataKey="formattedDate"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      `$${Number(value).toFixed(2)}`,
                      "Prezzo"
                    ]}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#colorPrice)"
                dot={false}
                activeDot={{ r: 6, fill: "#2563eb", stroke: "#ffffff", strokeWidth: 3 }}
                connectNulls={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Chart Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Prezzo Min</p>
            <p className="text-sm font-semibold">
              ${Math.min(...chartData.map(d => d.price)).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Prezzo Max</p>
            <p className="text-sm font-semibold">
              ${Math.max(...chartData.map(d => d.price)).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Volume Medio</p>
            <p className="text-sm font-semibold">
              {Math.round(chartData.reduce((sum, d) => sum + d.volume, 0) / chartData.length).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Volatilità</p>
            <p className="text-sm font-semibold">
              {(Math.abs(priceChangePercent)).toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
