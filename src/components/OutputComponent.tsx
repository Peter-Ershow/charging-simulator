import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type FormValues = {
    chargePoints: number;
    arrivalMultiplier: number;
    carConsumption: number;
    chargingPower: number;
};

const OutputComponent: React.FC<{ formValues: FormValues }> = ({ formValues }) => {
    // Example calculations based on form values
    const totalEnergyCharged = Math.max(0,formValues.chargePoints * formValues.carConsumption * (formValues.arrivalMultiplier / 100));
    const maxPowerDemand = Math.max(0, formValues.chargePoints * formValues.chargingPower);
    const totalChargingEvents = Math.max(0,formValues.chargePoints * (formValues.arrivalMultiplier / 100));


    // Data for the chart, I assume that the probability is calculated on a daily level and don't take weekends increase and further into account
    // I believe if the shop is in front of a ski resort, It would be "slightly" different. It's possible to implement such biases by bringing the probability matrix for time divisions
    const chartData = {
        labels: ['Day', 'Week', 'Month', 'Year'],
        datasets: [
            {
                label: 'Estimated Charging Events',
                data: [
                    totalChargingEvents,
                    totalChargingEvents * 7,
                    totalChargingEvents * 30,
                    totalChargingEvents * 365,
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="p-4 bg-gray-100 shadow-md rounded-md space-y-4">
            <h2 className="text-xl font-semibold">Simulation Results</h2>
            <div>Total Energy Charged: {totalEnergyCharged.toFixed(2)} kWh</div>
            <div>Max Power Demand: {maxPowerDemand.toFixed(2)} kW</div>
            <Bar data={chartData} options={{ maintainAspectRatio: true }} />
        </div>
    );
};

export default OutputComponent;
