import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Trash2 } from 'lucide-react';

export interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  productId,
  productName
}) => {
  const { deleteProduct } = useStore();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${productName}" from the catalog? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    deleteProduct(productId);
    setDeleting(false);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:text-red-900 transition-colors p-1.5 rounded hover:bg-red-50 disabled:opacity-50 cursor-pointer"
      title={`Delete ${productName}`}
    >
      <Trash2 className="w-4 h-4" />
      <span className="hidden sm:inline">{deleting ? 'Deleting…' : 'Delete'}</span>
    </button>
  );
};
