import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button } from './styledHtml';

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
`

const TitleImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const ProductImage = styled.img`
  max-width: 300px;
`
const VariantList = styled.div`
  display: flex;
  flex-direction: row;
`

export const QInput = styled.input`
  padding: 5px;
  border: none;
  border-radius: 4px;
  height: 20px;
  font-size: 14px;
  :focus{
    outline: none;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  }
`


const VariantCard = ({ variant, pid, addToCart }) => {
  const [quant, setQuant] = useState(1);
  console.log(variant.isInCart)
  return (
    <Card key={variant.id}>
      <h3>{variant.name}</h3>
      <h4>Price: ₹{variant.price}</h4>
      <span>Qty: </span>
      <QInput disabled={variant.isInCart} type="number" value={quant} onChange={(e) => { setQuant(parseInt(e.target.value)) }} />
      <Button disabled={variant.isInCart}
        onClick={() => {
          addToCart({ variables: { input: { variantId: variant.id, productId: pid, quantity: quant } } })
        }}>
        {variant.isInCart ? "In Cart" : "Add to cart"}
      </Button>

    </Card>
  )
}

export default ({ product, addToCart }) => {
  return (
    <Wrapper key={product.id}>
      <TitleImageWrapper>
        <h1>{product.name}</h1>
        <ProductImage src={product.imageuri} />
      </TitleImageWrapper>
      <VariantList >
        {product.variants.map((variant) => {
          return (
            <VariantCard key={variant.id} pid={product.id} addToCart={addToCart} variant={variant} />
          )
        })}
      </VariantList>
    </Wrapper>
  )
}