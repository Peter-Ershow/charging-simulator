import React from 'react';
import { useForm } from 'react-hook-form';

// map to handle changes
type FormValues = {
    chargePoints: number;
    arrivalMultiplier: number;
    carConsumption: number;
    chargingPower: number;
};

type InputComponentProps = {
    formValues: FormValues;
    onChange: (name: keyof FormValues, value: number) => void;
};

const InputComponent: React.FC<InputComponentProps> = ({ formValues, onChange }) => {
    const { register, formState: { errors } } = useForm<FormValues>({
        defaultValues: formValues,
    });

    const handleInputChange = (name: keyof FormValues, value: number) => {
        onChange(name, value);
    };

    return (
        <form className="p-4 space-y-4 bg-white shadow-md rounded-md">
            <div>
                <label className="block text-sm font-medium">Number of Charging Stations</label>
                <input
                    type="number"
                    {...register('chargePoints', {
                        required: true,
                        min: 1,
                        max: 200,
                        valueAsNumber: true,
                    })}
                    value={formValues.chargePoints}
                    onChange={(e) => handleInputChange('chargePoints', Number(e.target.value))}
                    className="input"
                    min={0}
                    max={200}
                />
                {errors.chargePoints && <span className="text-red-500">Enter a value between 1 and 200</span>}
            </div>

            <div>
                <label className="block text-sm font-medium">Arrival Probability Multiplier (%)</label>
                <input
                    type="number"
                    {...register('arrivalMultiplier', {
                        required: true,
                        min: 0,
                        max: 100,
                        valueAsNumber: true,
                    })}
                    value={formValues.arrivalMultiplier}
                    onChange={(e) => handleInputChange('arrivalMultiplier', Number(e.target.value))}
                    className="input"
                    min={0}
                    max={100}
                />
                {errors.arrivalMultiplier && <span className="text-red-500">Enter a value between 0% and 100%</span>}
            </div>

            <div>
                <label className="block text-sm font-medium">Car Consumption (kWh)</label>
                <input
                    type="number"
                    {...register('carConsumption', {
                        required: true,
                        min: 0,
                        max: 25,
                        valueAsNumber: true,
                    })}
                    value={formValues.carConsumption}
                    onChange={(e) => handleInputChange('carConsumption', Number(e.target.value))}
                    className="input"
                    min={0}
                    max={25}
                />
                {errors.carConsumption && <span className="text-red-500">Enter a value between 1 and 100 kWh</span>}
            </div>

            <div>
                <label className="block text-sm font-medium">Charging Power per Charge Point (kW)</label>
                <input
                    type="number"
                    {...register('chargingPower', {
                        required: true,
                        min: 1,
                        max: 50,
                        valueAsNumber: true,
                    })}
                    value={formValues.chargingPower}
                    onChange={(e) => handleInputChange('chargingPower', Number(e.target.value))}
                    className="input"
                    min={0}
                    max={50}
                />
                {errors.chargingPower && <span className="text-red-500">Enter a value between 1 and 50 kW</span>}
            </div>
        </form>
    );
};

export default InputComponent;