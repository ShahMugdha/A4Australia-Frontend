import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInventoryList, deleteProductInventory } from "../../../redux/actions/inventory";
import "../../../components/admin/inventory/inventory.css"
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from "reactstrap";

const Inventory = () => {
  const user = useSelector(state => state.auth)
  const productData = useSelector(state => state.products.productData)
  const inventoryData = useSelector(state => state.inventory.inventoryData)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInventoryList())
  }, [dispatch])
  const handleDelete = (productId) => {
    dispatch(deleteProductInventory(productId))
  }
  const handleEdit = (inventoryProduct) => {
    localStorage.setItem("inventoryProduct", JSON.stringify(inventoryProduct));
  }
  return (
    <>
      { user.isAuth ? null : <Link to="/login"></Link> }
      <Link to = "/admin/add-inventory"><Button>Add new inventory</Button></Link>
      {inventoryData.length > 0 ? (  
          inventoryData.map((inventory) => {
            return (
              <>
                <div style={{padding: "0.02px"}}>
                <DeleteIcon style={{float: "right", fontSize: "23px", marginRight: "5%"}} onClick={() => handleDelete(inventory.product._id)}/>
                <Link to = {`/admin/edit-inventory/${inventory.product._id}`}><EditIcon style={{float: "right", color: "black", fontSize: "23px"}} onClick={() => handleEdit(inventory.product)}/></Link>
                <table>
                  <thead>
                    <tr>
                      <th>{inventory.product.title}</th>
                      <th colSpan={inventory.stock ? inventory.stock.length : '0'}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="2">{inventory.product.description}</td>
                        {inventory.stock ? (
                          inventory.stock.map((stock) => {
                            return (
                              <>
                                <th>{stock.size}</th>
                              </>
                            )
                          })
                        ): ''}
                    </tr>
                    <tr>
                      {inventory.stock ? (
                        inventory.stock.map((stock) => {
                          return (
                            <>
                              <td>{stock.quantity}</td>
                            </>
                          )
                        })
                      ): '0'}
                    </tr>
                  </tbody>
                </table>
                </div>
              </>
            )
          })
      ) : (
        <h1> Inventories not available</h1>
      )}
    </>
  );
};

export default Inventory;