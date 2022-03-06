import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import ProductList from './ProductList';
import { Product } from '../../app/models/product';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
    </Grid>
  );
};

export default Catalog;
