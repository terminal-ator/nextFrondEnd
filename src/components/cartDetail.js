import React from 'react';
import styled from 'styled-components';
import { StyledLink } from './styledHtml';
import { QInput } from './productDetail';

const Wrapper = styled.div`
  /* border: 1px solid #ECE2E2; */
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 500px;
`

const ItemCard = styled.div`
  display:flex;
  flex-direction:row;
  align-items:space-between;
  width: 99%;
  border-bottom: 1px solid #ECE2E2;
  padding: 10px;
`

const NameSpan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const DetailSpan = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  width: 100%;
`

const ActionSpan = styled.div`
  font-size: 12px;
  display: flex;
`
const Ispan = styled.span`
  margin-left: 10px;
  color: red;
  :hover{
    color: black;
    text-decoration: underline;
    cursor: pointer;
  }
`

const CartItem = ({ item, removeCart, updateQuantity }) => {
  const { variant, product } = item;
  const totalRow = item.quantity * variant.price;
  const showQuant = item.quantity != 0 ? item.quantity : null;
  return (
    <ItemCard>
      <span><img src={product.imageuri} style={{ maxHeight: 60 }} /></span>
      <NameSpan>
        <span>
          <StyledLink to={`/product/${product.id}`}>
            {product.name}
          </StyledLink>
        </span>
        <DetailSpan>
          <span>{variant.name}</span>
          <span>Qty:
          <QInput
              value={showQuant}
              onChange={(e) => {
                updateQuantity({
                  variables: { cartItemId: item.id, quant: parseInt(e.target.value) || 0 },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updateCartQuant: {
                      __typename: 'CartItem',
                      id: item.id,
                      quantity: parseInt(e.target.value) || 0
                    }
                  }
                })
              }}
            />
          </span>
          <span>Price: ₹{variant.price}</span>
          <span>Total: ₹{totalRow}</span>
        </DetailSpan>
        <ActionSpan>
          <span>Save for later</span>
          <Ispan><a onClick={() => {
            removeCart({
              variables: {
                id: item.id
              }
            })
          }}>Remove from cart</a></Ispan>
        </ActionSpan>
      </NameSpan>


    </ItemCard>
  )
}


const CartDetail = ({ items, removeCart, updateQuantity }) => {
  return (
    <Wrapper>
      {items.map((item) => <CartItem updateQuantity={updateQuantity} removeCart={removeCart} key={item.id} item={item} />)}
    </Wrapper>
  )
}

export default CartDetail;