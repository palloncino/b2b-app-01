import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dateText } from "../../utils/date-text.js";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Pagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ProductList({ products, handleDeleteProducts }) {
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  // Sorting handler
  const handleSortRequest = (column) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    let compare = 0;

    switch (orderBy) {
      case "name":
        compare = a.name.localeCompare(b.name);
        break;
      case "category":
        compare = a.category.localeCompare(b.category);
        break;
      case "price":
        compare = a.price - b.price;
        break;
      case "dateCreated":
        // Assuming dateCreated is in a format that can be directly compared
        // You might need to parse these dates if they're in a string format
        compare = new Date(a.dateCreated) - new Date(b.dateCreated);
        break;
      default:
        break;
    }

    return orderDirection === "asc" ? compare : -compare;
  });

  // Pagination controls
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Calculate the current page slice
  const currentPageProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div id="ProductList" className="product-list">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? orderDirection : "asc"}
                  onClick={() => handleSortRequest("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>

              {/* Image column header adjusted to disable sorting indication */}
              <TableCell align="right">Image</TableCell>

              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? orderDirection : "asc"}
                  onClick={() => handleSortRequest("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? orderDirection : "asc"}
                  onClick={() => handleSortRequest("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? orderDirection : "asc"}
                  onClick={() => handleSortRequest("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "dateCreated"}
                  direction={orderBy === "dateCreated" ? orderDirection : "asc"}
                  onClick={() => handleSortRequest("dateCreated")}
                >
                  Date Created
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentPageProducts.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                hover
                onClick={() => handleRowClick(product.id)}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    style={{ width: "50px", height: "auto" }}
                  />
                </TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  {dateText(product.dateCreated)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    component={Link}
                    to={`/edit-product/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling up to the row's onClick event
                      handleDeleteProducts(product.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ padding: 2 }}>
        <Pagination
          component="div"
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
}

export default ProductList;
