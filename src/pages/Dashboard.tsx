import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import * as c3 from 'c3';
import axios from "axios";

const Dashboard = () => {
    
    useEffect(() => {
        (
            async () => {
                const chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'x',
                        columns: [
                            ['x'],
                            ['Sales'],
                        ],
                        types: {
                            Sales: 'bar'
                        }
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%Y-%m-%d'
                            }
                        }
                    }
                });
                // ambil data untuk chart
                const {data} = await axios.get('chart');

                chart.load({
                    columns: [
                        ['x', ...data.map((r: any) => r.date)],
                        ['Sales', ...data.map((r: any) => r.total_price)],
                    ],
                })
            }
        )()   
    }, []);

    return (
        <Wrapper>
            <h2>Daily Sales</h2>
            <div id="chart" />
        </Wrapper>
    );
}

export default Dashboard;