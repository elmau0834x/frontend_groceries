import React, { useState, useEffect } from 'react';

interface FormProps {
  onAddProduct: (product: any) => void;
  onUpdateProduct: (product: any) => void;
  editingProduct: Product | null;
}

interface Product {
  barcode: string;
  description: string;
  brand: string;
  cost: number;
  price: number;
  expired_date: string;
  stock: number;
}

export const Form = ({ onAddProduct, onUpdateProduct, editingProduct }: FormProps) => {
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');
  const [expired_date, setExpiredDate] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setBarcode(editingProduct.barcode);
      setDescription(editingProduct.description);
      setBrand(editingProduct.brand);
      setCost(editingProduct.cost.toString());
      setPrice(editingProduct.price.toString());
      setExpiredDate(editingProduct.expired_date);
      setStock(editingProduct.stock.toString());
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear el nuevo producto
    const newProduct = {
      barcode,
      description,
      brand,
      cost: parseFloat(cost),
      price: parseFloat(price),
      expired_date,
      stock: parseInt(stock),
    };

    console.log('Producto a agregar:', newProduct); // Verificar datos

    if (editingProduct) {
      await onUpdateProduct(newProduct);
    } else {
      await onAddProduct(newProduct);
    }

    // Limpiar el formulario
    setBarcode('');
    setDescription('');
    setBrand('');
    setCost('');
    setPrice('');
    setExpiredDate('');
    setStock('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="fst-italic">{editingProduct ? 'Editar Producto' : 'Registro de Productos'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="txtBarcode" className="form-label fw-bold">Código de Barras</label>
              <input
                type="text"
                id="txtBarcode"
                className="form-control"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                disabled={!!editingProduct}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="txtDescription" className="form-label fw-bold">Descripción del Producto</label>
              <input
                type="text"
                id="txtDescription"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="txtBrand" className="form-label fw-bold">Marca del Producto</label>
              <input
                type="text"
                id="txtBrand"
                className="form-control"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="txtCost" className="form-label fw-bold">Costo del Producto</label>
              <input
                type="text"
                id="txtCost"
                className="form-control"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="txtPrice" className="form-label fw-bold">Precio del Producto</label>
              <input
                type="text"
                id="txtPrice"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="txtExpired_Date" className="form-label fw-bold">Fecha de Caducidad</label>
              <input
                type="date"
                id="txtExpired_date"
                className="form-control"
                value={expired_date}
                onChange={(e) => setExpiredDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <label htmlFor="txtStock" className="form-label fw-bold">Existencias</label>
              <input
                type="text"
                id="txtStock"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="col-lg-4"></div>
          </div>

          <div className="row">
            <div className="col-lg-12 mt-3">
              <button type="submit" className="btn btn-success col-lg-12">
                {editingProduct ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};