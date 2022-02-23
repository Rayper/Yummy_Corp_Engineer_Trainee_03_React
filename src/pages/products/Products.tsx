import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/product';

const Products = () => {
    // useState untuk products
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products?page=${page}`);

                setProducts(data.data);
                setLastPage(data.meta.last_page);
            }
        )()
    }, [page]);

    const delete_products = async (id: number) => {
        if(window.confirm('Are you sure want to delete this record?')) {
            await axios.delete(`products/${id}`);
            // dapetin semua products kecuali users yang telah didelete melalui id
            setProducts(products.filter((p: Product) => p.id !== id ));
        }
    }

    

    return (
        <Wrapper>

            <div className="pt-3 pb-3 mb-3 border-bottom">
                <Link to="/products/create" className="btn btn-sm btn-primary">Create Products</Link>
            </div>

            <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {products.map((p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} width="50"/></td>
                                    <td>{p.title}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                                <Link to={`/products/${p.id}/edit`} className="btn btn-sm btn-success">Edit</Link>
                                        </div>
                                        <div className="btn-group mr-2">
                                                <a href="#" className="btn btn-sm btn-danger" 
                                                onClick={() => delete_products(p.id)}
                                                >Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                  </table>
            </div>

            {/* panggil component Paginator disini             */}
            {/* bisa seperti ini : page => setPage(page) */}
            {/* bisa juga langsung : setPage(page) */}
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
        </Wrapper>
    );
};

export default Products;