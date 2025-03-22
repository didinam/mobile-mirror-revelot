
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StockStatusType = {
  inStock: boolean;
  lowStock: boolean;
  stock: number;
};

type ProductStockStatusProps = {
  stockStatus: StockStatusType;
  t: (key: string, options?: any) => string;
};

const ProductStockStatus = ({ stockStatus, t }: ProductStockStatusProps) => {
  return (
    <>
      {stockStatus.inStock ? (
        stockStatus.lowStock ? (
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            {t('onlyLeft', { count: stockStatus.stock })}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-green-600 border-green-600">
            {t('inStock')}
          </Badge>
        )
      ) : (
        <Badge variant="outline" className="text-red-600 border-red-600">
          {t('outOfStock')}
        </Badge>
      )}
    </>
  );
};

export default ProductStockStatus;
