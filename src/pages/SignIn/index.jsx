import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from "query-string";

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, Icon, Github } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    console.log("1")
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

    async function handleGithubSignIn() {

      const VITE_API_GITHUB_AUTH_URL = import.meta.env.VITE_API_GITHUB_AUTH_URL;
      const VITE_API_GITHUB_CLIENT_ID = import.meta.env.VITE_API_GITHUB_CLIENT_ID;
      const VITE_API_GITHUB_REDIRECT_URI = import.meta.env.VITE_API_GITHUB_REDIRECT_URI;

      const params = {
        response_type: 'code',
        scope: 'user',
        client_id: VITE_API_GITHUB_CLIENT_ID,
        redirect_uri: VITE_API_GITHUB_REDIRECT_URI,
      }

      try {
        const queryStrings = qs.stringify(params);
        const authorizationUrl = `${VITE_API_GITHUB_AUTH_URL}?${queryStrings}`;
        window.location.href = authorizationUrl;

      } catch (err) {
        console.error('Erro durante a autenticação com o GitHub:', err);
      }
    }

    window.onload = async () => {
      const VITE_API_BACK_END_URL = import.meta.env.VITE_API_BACK_END_URL;

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
    
      if (code) {
        try {

          console.log("code enviado para o back-end", code)

          const response = await axios.post(`${VITE_API_BACK_END_URL}/auth/sign-in/github`, { code });
          setUserData(response.data);
          navigate('/dashboard');
          alert("Você está logado, meu chapa! Dá uma olhada no console!");
        } catch (err) {
          alert("Ops, deu algum ruim! Dá uma olhada no console!");
          console.error('Erro durante a autenticação com o GitHub:', err);
        }
      }
    }
    


  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
      <Icon onClick={handleGithubSignIn}>
          <Github/>
          <p>GitHub</p>
      </Icon>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}