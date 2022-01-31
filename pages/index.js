import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import { useRouter } from 'next/router'
import { allowedStatusCodes } from 'next/dist/lib/load-custom-routes';

function Title(props){
    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.primary['400']};
            }
            `}</style>
        </>
    );
}

export default function InicialPage() {
    //const username = 'Welcome121';
    const [username, setUsername] = React.useState('alura')
    const routing = useRouter();
    let allowPhoto = false;

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary["900"],
            backgroundImage: 'url(https://miro.medium.com/max/1200/0*DZZjrKbTxFTssqRK.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals["400"],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}

              onSubmit = {(events) => {
                console.log("Alguem submeteu o form");
                
                //Impede que o evento padrão ocorra, no caso, o reload da página
                events.preventDefault();

                routing.push(`/chat?username=${username}`);
              }}
            >

              <Title tag="h2">CHAT REACT</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary["800"] }}>
                {appConfig.phrase}
              </Text>
  
              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.primary["400"],
                    mainColor: appConfig.theme.colors.neutrals["100"],
                    mainColorHighlight: appConfig.theme.colors.primary["300"],
                    backgroundColor: appConfig.theme.colors.neutrals["200"],
                  },
                }}

                placeholder = "Usuário github..."

                onChange = {(event) => {
                  console.log("Alguem alterou a caixa de texto")

                  //local onde o valor esta armazenado
                  const valor = event.target.value
                  const NUM_MIN_CHARACTERS = 2

                  if(valor.length || username.length > NUM_MIN_CHARACTERS) allowPhoto = true;
                  else allowPhoto = false;

                  //Trocando o valor da variavel username através do react
                  if (allowPhoto) setUsername(valor);
                  else setUsername('');
                }}
              /> 

              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary["500"],
                  mainColorLight: appConfig.theme.colors.primary["400"],
                  mainColorStrong: appConfig.theme.colors.primary["600"],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals["300"],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals["200"],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals["000"],
                  backgroundColor: appConfig.theme.colors.neutrals["200"],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }