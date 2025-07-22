import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyData {
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: string;
  peRatio: number;
  volume: number;
  change: number;
  changePercent: number;
}

interface CompanyInfoProps {
  companyData: CompanyData;
}

export function CompanyInfo({ companyData }: CompanyInfoProps) {
  const isPositiveChange = companyData.change >= 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              {companyData.name}
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              {companyData.symbol}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              ${companyData.currentPrice.toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={isPositiveChange ? "default" : "destructive"}
                className={isPositiveChange ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isPositiveChange ? "+" : ""}{companyData.change.toFixed(2)}
              </Badge>
              <span className={`text-sm ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
                ({isPositiveChange ? "+" : ""}{companyData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-lg font-semibold">{companyData.marketCap}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">P/E Ratio</p>
            <p className="text-lg font-semibold">{companyData.peRatio.toFixed(2)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="text-lg font-semibold">{companyData.volume.toLocaleString()}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Variazione Giornaliera</p>
            <p className={`text-lg font-semibold ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
              {isPositiveChange ? "+" : ""}{companyData.change.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
