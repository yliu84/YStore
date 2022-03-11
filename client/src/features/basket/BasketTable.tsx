import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';

import { BasketItem } from '../../app/models/basket';

interface Props {
  items: BasketItem[];
  handleAddItem: (productId: number, name: string) => void;
  handleRemoveItem: (productId: number, quantity: number, name: string) => void;
  isBasket?: boolean;
}

const BasketTable = ({
  items,
  handleAddItem,
  handleRemoveItem,
  isBasket = true,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='center'>Quantity</TableCell>
            <TableCell align='right'>Subtotal</TableCell>
            {isBasket && <TableCell align='right'></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                <Box display='flex' alignItems='center'>
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align='right'>
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align='center'>
                {isBasket && (
                  <LoadingButton
                    // loading={
                    //   status === 'pendingRemoveItem' + item.productId + 'rem'
                    // }
                    // onClick={() =>
                    //   dispatch(
                    //     removeBasketItemAsync({
                    //       productId: item.productId,
                    //       quantity: 1,
                    //       name: 'rem',
                    //     })
                    //   )
                    // }
                    onClick={() =>
                      handleRemoveItem(item.productId, 1, item.name)
                    }
                    color='error'
                  >
                    <Remove />
                  </LoadingButton>
                )}
                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    // loading={status === 'pendingAddItem' + item.productId}
                    // onClick={() =>
                    //   dispatch(
                    //     addBasketItemAsync({ productId: item.productId })
                    //   )
                    // }
                    onClick={() => handleAddItem(item.productId, item.name)}
                    color='secondary'
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align='right'>
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              {isBasket && (
                <TableCell align='right'>
                  <LoadingButton
                    // loading={
                    //   status === 'pendingRemoveItem' + item.productId + 'del'
                    // }
                    // onClick={() =>
                    //   dispatch(
                    //     removeBasketItemAsync({
                    //       productId: item.productId,
                    //       quantity: item.quantity,
                    //       name: 'del',
                    //     })
                    //   )
                    // }
                    color='error'
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
