import React from "react";

const Product = ({ product, onBan }) => {
    if (!product) return null;

    return (
        <div>
            <h2> {product.name} </h2>
            {product && (
                <div>
                    <img src={product.image_link} alt={product.name} width="200" />
                    <p><strong>Makeup Brand:</strong>
                        <button onClick={() => onBan("Brand", product.brand)} className="clickable">
                            {product.brand}</button></p>
                    <p><strong>Product Type:</strong>
                        <button onClick={() => onBan("Product Type", product.product_type)} className="clickable">
                            {product.product_type || "N/A"}</button></p>
                    <p><strong>Product Category</strong>
                        <button onClick={() => onBan("Category", product.category)} className='clickable'>{product.category || "N/A"}</button></p>
                </div>
            )}
        </div>
    )
};

export default Product;