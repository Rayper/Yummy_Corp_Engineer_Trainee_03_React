import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
        // setState untuk ambil data users
        const [users, setUsers] = useState([]);

        // setState untuk paginations
        // initial dari page ke 1
        const [page, setPage] = useState(1);

        // setState untuk last_page, supaya saat sudah sampai di last page ketika klik next akan berhenti
        const [lastPage, setLastPage] = useState(0);

        // ambil data users
        useEffect(() => {
          (
              async () => {
                const {data} = await axios.get(`users?page=${page}`);
                
                setUsers(data.data);
                // set lastPage menjadi halaman terakhir
                setLastPage(data.meta.last_page);
              }
          )()
        // [page] => artinya setiap ada perubahan pada page, di function next. Maka akan memanggil ulang useEffect dan reload users
        }, [page]);

        const next = () => {
          if(page < lastPage) {
            setPage(page  + 1);
          }
        }

        const prev = () => {
          if(page >= 1) {
            setPage(page - 1);
          }
        }

        return (
          <Wrapper>
            <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => {
                          return (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.first_name} {user.last_name}</td>
                              <td>{user.email}</td>
                              <td>{user.role.name}</td>
                              <td></td>
                            </tr>
                          )
                          })}
                    </tbody>
                  </table>
            </div>

            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" onClick={prev}>Previous</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={next}>Next</a>
              </li>
            </ul>

          </Wrapper>
        );
}

export default Users;