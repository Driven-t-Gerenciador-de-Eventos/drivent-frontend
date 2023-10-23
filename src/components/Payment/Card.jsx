import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { FormWrapper } from '../PersonalInformationForm/FormWrapper';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from './utils';
import { toast } from 'react-toastify';

export default function PaymentForm(props) {
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

    const handleSubmit = e => {
        e.preventDefault();
        const set = props.props[1];
        set(true);
        //salvar informações onde?
        toast('Informações salvas com sucesso!');
    };

    return (
        <>
            <Typography variant="h6" color="#8E8E8E">Pagamento</Typography>
            <FormWrapper onSubmit={handleSubmit}>
                <Container>
                    <Cards
                        number={state.number}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        name={state.name}
                        focused={state.focus}
                    />
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
                </Container>
                <FinalizeButton type="submit">FINALIZAR PAGAMENTO</FinalizeButton>
            </FormWrapper>
        </>
    );
}

const Container = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin: 10px 0px;
`

const Form = styled.div`
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

const FinalizeButton = styled.button`
  cursor: pointer;
  padding: 11px;
  border-radius: 4px;
  border: none;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  margin-top: 25px;
`