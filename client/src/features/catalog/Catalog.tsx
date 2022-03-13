import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ProductList from './ProductList';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import LoadingComponent from '../../app/layout/LoadingComponent';

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes('pending'))
    return <LoadingComponent message='Loading products...' />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
    </Grid>
  );
};

export default Catalog;
