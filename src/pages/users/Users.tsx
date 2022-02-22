import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
        // setState untuk ambil data users
        const [users, setUsers] = useState([]);

        // ambil data users
        useEffect(() => {
          (
              async () => {
                const {data} = await axios.get('users');
                
                setUsers(data.data);
              }
          )()

        }, []);

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
          </Wrapper>
        );
}

export default Users;