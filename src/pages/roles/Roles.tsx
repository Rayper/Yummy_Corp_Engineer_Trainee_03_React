import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';

const Roles = () => {
    // useState untuk roles
    const [roles, setRoles] = useState([]);

    // useEffect untuk dapetin data roles
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('roles');

                setRoles(data);
            }
        )();
    }, []);

    const delete_role = async (id: number) => {
        if(window.confirm('Are you sure want to delete this record?')) {
            await axios.delete(`roles/${id}`);
            // dapetin semua users kecuali users yang telah didelete melalui id
            setRoles(roles.filter((r: Role) => r.id !== id ));
        }
    }
    
    return (
        <Wrapper>

            <div className="pt-3 pb-3 mb-3 border-bottom">
                <Link to="/roles/create" className="btn btn-sm btn-primary">Create Roles</Link>
            </div>

            <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {roles.map((role: Role) => {
                            return (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-success">Edit</Link>
                                        </div>
                                        <div className="btn-group mr-2">
                                            <a href="#" className="btn btn-sm btn-danger" 
                                            onClick={() => delete_role(role.id)}
                                            >Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                  </table>
            </div>
        </Wrapper> 
    );
};

export default Roles;

