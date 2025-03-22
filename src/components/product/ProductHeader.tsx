
import React from 'react';

type ProductHeaderProps = {
  productId: string;
  title: string;
};

const ProductHeader = ({ productId, title }: ProductHeaderProps) => {
  return (
    <>
      <div className="text-sm text-gray-500 mb-2">REVELOT</div>
      <h1 className="text-2xl md:text-3xl font-serif mb-3">{title}</h1>
      <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">SKU: {productId}</div>
        </div>
      </div>
    </>
  );
};

export default ProductHeader;
