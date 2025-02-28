import axios from "axios";
import React from "react";

interface Product {
  barcode: string;
  description: string;
  brand: string;
  cost: number;
  price: number;
  expired_date: string;
  stock: number;
}

interface TableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const Table: React.FC<TableProps> = ({ products, setProducts, setEditingProduct }) => {
  
  const eliminarProducto = async (barcode: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el producto con código de barras ${barcode}?`);
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://192.168.137.1:3000/groceries/products/deleteOne/${barcode}`);
      console.log(`Producto con código ${barcode} eliminado`);

      // 🔥 Actualiza la lista de productos eliminando el producto de la UI
      setProducts((prevProducts) => prevProducts.filter((product) => product.barcode !== barcode));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Description</th>
          <th>Brand</th>
          <th>Cost</th>
          <th>Price</th>
          <th>Expired Date</th>
          <th>Stock</th>
          <th colSpan={2}>Operaciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.barcode}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>{product.brand}</td>
              <td>{product.cost}</td>
              <td>{product.price}</td>
              <td>{product.expired_date}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="btn btn-success col-lg-12"
                  onClick={() => setEditingProduct(product)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger col-lg-12"
                  onClick={() => eliminarProducto(product.barcode)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>No hay productos disponibles.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};