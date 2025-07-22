import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AIRecommendation {
  action: string;
  stopLoss: number;
  targetPrice: number;
  confidence: string;
  timeframe: string;
  analysis: string;
  riskManagement: string;
}

interface RecommendationProps {
  recommendation: AIRecommendation;
}

export function Recommendation({ recommendation }: RecommendationProps) {
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'compra':
        return 'bg-green-600 hover:bg-green-700';
      case 'vendi':
        return 'bg-red-600 hover:bg-red-700';
      case 'short':
        return 'bg-orange-600 hover:bg-orange-700';
      case 'aspetta':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'alta':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bassa':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Raccomandazione AI</CardTitle>
          <div className="flex items-center gap-3">
            <Badge 
              className={`text-white text-lg px-4 py-2 ${getActionColor(recommendation.action)}`}
            >
              {recommendation.action}
            </Badge>
            <Badge 
              variant="outline" 
              className={getConfidenceColor(recommendation.confidence)}
            >
              Confidenza: {recommendation.confidence}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Stop Loss</p>
            <p className="text-2xl font-bold text-red-600">
              ${recommendation.stopLoss.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Target Price</p>
            <p className="text-2xl font-bold text-green-600">
              ${recommendation.targetPrice.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Timeframe</p>
            <p className="text-2xl font-bold">
              {recommendation.timeframe}
            </p>
          </div>
        </div>

        <Separator />

        {/* Analysis */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Analisi Dettagliata</h3>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {recommendation.analysis}
            </p>
          </div>
        </div>

        <Separator />

        {/* Risk Management */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Gestione del Rischio</h3>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm leading-relaxed text-yellow-800 whitespace-pre-wrap">
              {recommendation.riskManagement}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-xs text-red-700">
            <strong>Disclaimer:</strong> Questa analisi è generata da intelligenza artificiale e non costituisce consulenza finanziaria professionale. 
            Gli investimenti comportano sempre dei rischi. Consulta sempre un consulente finanziario qualificato prima di prendere decisioni di investimento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
