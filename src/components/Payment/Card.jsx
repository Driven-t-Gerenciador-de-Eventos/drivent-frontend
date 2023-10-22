import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { FormWrapper } from '../PersonalInformationForm/FormWrapper';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from './utils';

export default function PaymentForm() {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
        issuer: ''
    });

    const handleInputChange = (evt) => {
        let { name, value } = evt.target;

        if (name === "number") {
            value = formatCreditCardNumber(value);
        } else if (name === "expiry") {
             value = formatExpirationDate(value);
        } else if (name === "cvc") {
            value = formatCVC(value);
        }

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    // const handleSubmit = e => {
    //     e.preventDefault();
    // };

    //add botão aqui e não no index? para lidar com o onSubmit, ao inves de ter uma funcao onClick

    return (
        <>
            <Typography variant="h6" color="#8E8E8E">Pagamento</Typography>

            <Container>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <FormWrapper>
                    <Form>
                        <input
                            type="tel"
                            name="number"
                            required
                            placeholder="Card Number"
                            className="big"
                            value={state.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        <Typography variant="subtitle1" color="#8E8E8E">E.g.: 49..., 51..., 36..., 37...</Typography>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Name"
                            className="big"
                            value={state.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        <div>
                            <input
                                type="tel"
                                name="expiry"
                                required
                                placeholder="Valid thru"
                                className="small"
                                value={state.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                            <input
                                type="tel"
                                name="cvc"
                                required
                                placeholder="CVC"
                                className="small"
                                value={state.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                    </Form>
                </FormWrapper>
            </Container>

        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin: 10px 0px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;

    max-width: 400px;

    input{
        max-height: 40px;
        border-radius: 7px;
        border: solid 1px #8E8E8E;
        padding: 10px;

        color: #454545;
        font-size: 18px;
    }

    div{
        display: flex;
        gap: 10px;
    }

    .big{
        width: 100%;
    }

    .small{
        width: 50%;
    }
`