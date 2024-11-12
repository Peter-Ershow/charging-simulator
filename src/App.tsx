import React, { useState } from 'react';
import { motion } from 'framer-motion';
import chroma from 'chroma-js';
import InputComponent from './components/InputComponent';
import OutputComponent from './components/OutputComponent';

type FormValues = {
    chargePoints: number;
    arrivalMultiplier: number;
    carConsumption: number;
    chargingPower: number;
};

const App: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        chargePoints: 20,
        arrivalMultiplier: 30,
        carConsumption: 18,
        chargingPower: 11,
    });

    const handleFormChange = (name: keyof FormValues, value: number) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const totalEnergyCharged = formValues.chargePoints * formValues.carConsumption * (formValues.arrivalMultiplier / 100);
    const maxPowerDemand = formValues.chargePoints * formValues.chargingPower;

    const demandRatio = Math.min(totalEnergyCharged / maxPowerDemand, 2);
    const backgroundColor = chroma.mix('#ccffcc', '#f63333', demandRatio).hex();

    return (
        <motion.div
            className="container mx-auto p-4 space-y-4"
            style={{ minHeight: '100vh' }}
            animate={{ backgroundColor }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <h1 className="text-2xl font-bold">EV Charging Simulation</h1>
            <InputComponent formValues={formValues} onChange={handleFormChange} />
            <OutputComponent formValues={formValues} />
        </motion.div>
    );
};

export default App;
