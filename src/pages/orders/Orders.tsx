import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blob } from 'stream/consumers';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order_item';
import { User } from '../../models/user';

// function untuk sembunyiin orders_items
const hide = {
    maxHeight: 0,
    transition: '800ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '800ms ease-out'
}

const Orders = () => {
    // useState untuk orders
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    // selected orders
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`orders?page=${page}`);

                // masukan data orders ke setOrders
                setOrders(data.data);
                setLastPage(data.meta.last_page);
            }
        )();
    }, [page]); 

    const select = (id: number) => {
        // validasi untuk orders yang di click, ketika selected === id return 0 atau bisa di collapse
        setSelected(selected === id ? 0 : id);
    }

    const handleExport = async () => {
        // paramter kedua datanya, paramter ketiga => confignya
        const {data} = await axios.post('export', {} , {responseType: 'blob'});
        // format-nya
        const blob = new Blob([data], {type: 'text/csv'})
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        // nama csv nya saat didownload
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-3 mb-3 border-bottom">
                <a href="#" className="btn btn-sm btn-primary" onClick={handleExport}>Export</a>
            </div>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o: Order) => {
                            return (
                                <>
                                    <tr key={o.id}>
                                        <td>{o.id}</td>
                                        <td>{o.full_name}</td>
                                        <td>{o.email}</td>
                                        <td>Rp. {o.total_price},00</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                            <a href="#" className="btn btn-sm btn-primary" 
                                                onClick={() => select(o.id)}
                                            >View</a>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={5}>
                                            <div className='overflow-hidden' style={selected === o.id ? show : hide}>
                                                <table className='table table-sm'>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Product Title</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {o.order_items.map((i: OrderItem) => {
                                                            return(
                                                                <tr>
                                                                    <td>{i.id}</td>
                                                                    <td>{i.product_title}</td>
                                                                    <td>{i.quantity}</td>
                                                                    <td>{i.price}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
        </Wrapper>
    );
};

export default Orders;