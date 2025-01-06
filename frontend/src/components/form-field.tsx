import React, { Fragment, useEffect, useState } from 'react';
import { FieldError, UseFormRegister } from "react-hook-form";


import { Input } from "@/components/ui/input"
import { Label } from './ui/label';
import { title } from 'process';



export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: string;
    title:string;
    register: UseFormRegister<any>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber
    }) => {


    return (
        <Fragment>
            <Label htmlFor={name}>{title}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                />
            {error ? <p>Error {error.message}</p> : ""}
        </Fragment>
    );
};

export default FormField;