import { useState, useEffect } from "react";
import axios from "axios";  // Importar axios
import { Form } from "./components/Form";
import { Navbar } from "./components/Navbar";
import { Table } from "./components/Table";

// Define el tipo del producto
interface Product {
  barcode: string;
  description: string;
  brand: string;
  cost: number;
  price: number;
  expired_date: string;
  stock: number;
}

function App() {
  // Mantener el estado de los productos
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Estado para manejar carga
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);  // Estado para manejar el producto en edición

  // Función para obtener los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://10.10.60.13:3000/groceries/products/getAll");
        console.log(response.data);  // Verifica los datos en la consola
        setProducts(response.data.data.data);  // Asume que la respuesta tiene los productos directamente en response.data
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };    

    fetchProducts();
  }, []);  // Se ejecuta una sola vez cuando el componente se monta
  
  // Función para agregar un producto
  const onAddProduct = async (newProduct: any) => {
    try {
      const response = await fetch('http://10.10.60.13:3000/groceries/products/insertOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      const result = await response.json(); // Convertir la respuesta a JSON
  
      if (response.ok) {
        console.log('Producto agregado correctamente');
        // Actualizar el estado de los productos
        setProducts((prevProducts) => [...prevProducts, result.data.data]);
      } else {
        if (result.data.message.includes('El producto con este código de barra ya existe')) {
          alert('El código de barras ya está en uso. Por favor, use un código de barras diferente.');
        } else {
          console.error('Error al agregar producto:', result.data.message || 'Error desconocido');
        }
      }
    } catch (error) {
      console.error('Error al hacer la solicitud', error);
    }
  };

  // Función para actualizar un producto
  const onUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`http://10.10.60.13:3000/groceries/products/updateOne/${updatedProduct.barcode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.barcode === updatedProduct.barcode ? updatedProduct : product
          )
        );
        setEditingProduct(null);  // Limpiar el estado de edición
        console.log('Producto actualizado correctamente');
      } else {
        console.error('Error al actualizar producto');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mb-4">
          {/* Aquí va el componente NavBar */}
          <Navbar />
        </div>
        <div className="row">
          <div className="col-lg-5">
            {/* Pasamos onAddProduct y onUpdateProduct al componente Form */}
            <Form onAddProduct={onAddProduct} onUpdateProduct={onUpdateProduct} editingProduct={editingProduct} />
          </div>
          <div className="col-lg-7">
            {/* Aquí va la llamada al componente para la tabla */}
            {loading ? (
              <p>Cargando productos...</p> // Mostrar un mensaje de carga mientras se obtiene la información
            ) : (
              <Table products={products} setProducts={setProducts} setEditingProduct={setEditingProduct} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;