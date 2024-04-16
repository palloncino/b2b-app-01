import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import CreateProduct from "../../components/CreateProduct/index.js";
import FlashMessage from "../../components/FlashMessage/index.js";
import Loading from "../../components/Loading/index.js";
import { useAppState } from "../../state/stateContext.js";

function CreateProductPage() {
  const { addProduct } = useAppState();
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imgUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const currentDate = new Date().toISOString();
    const newProduct = {
      ...product,
      dateCreated: currentDate,
      dateLastUpdate: currentDate,
    };
    try {
      const returnedProduct = await addProduct(newProduct);
      setMessage(
        `Successfully created item ${returnedProduct.name}, ID: ${returnedProduct.id}.`
      );
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        imgUrl: "",
      });
    } catch (error) {
      setErrorMessage(
        `Something went wrong creating item ID: ${newProduct.id}, Error: ${error.message}`
      );
      console.error("Failed to add product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setProduct({ ...product, imgUrl: e.target.result });
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="create-product-page">
      {errorMessage && (
        <Box my={2}>
          <FlashMessage message={errorMessage} type="error" />
        </Box>
      )}
      {message && (
        <Box my={2}>
          <FlashMessage message={message} type="success" />
        </Box>
      )}
      <h1>Create a New Product</h1>
      <CreateProduct
        product={product}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        fileInputRef={fileInputRef}
      />
    </div>
  );
}

export default CreateProductPage;
