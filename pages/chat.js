import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

//back-end
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM3MTk3MCwiZXhwIjoxOTU4OTQ3OTcwfQ.6AAnm4S9J0jk0e1Ffzkr-oykD5Ph5NfMJAOyshCnA1A'
const SUPABASE_URL = 'https://vgkmejydgemhhdbnlyhz.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function allertNewMessage(addMessage){
    return supabaseClient.from('posts').on('INSERT', (answerLive) => {
        addMessage(answerLive.new)
    }).subscribe()
}

export default function ChatPage() {
    const routing = useRouter();
    const currentUser = routing.query.username
    const [message, setMessage] = React.useState('')
    const [ChatList, setChatList] = React.useState([])
    
    React.useEffect(() =>{''
        const dadosSupabase = supabaseClient
            .from('posts').select('*')
            .order('id', { ascending: false })
            .then(({data}) => {
                setChatList(data)
            })

            allertNewMessage((newMessage) => {
                console.log('New message: ', newMessage)
                setChatList((currentChatList) => {
                    return [
                        newMessage,
                        ...currentChatList
                    ]
                })
            })

    }, [])

    function handleNewMessage(newMessage) {
        const message = {
            textMessage: newMessage,
            from: currentUser,
        }

        supabaseClient
            .from('posts')
            .insert([message])
            .then(({ data }) => {
                console.log('creating message: ', data)
            })

        setMessage('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary["900"],
                backgroundImage: `url(https://miro.medium.com/max/1200/0*DZZjrKbTxFTssqRK.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals["400"],
                    opacity: 0.8,
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals["300"],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList message={ChatList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals["100"],
                                marginRight: '50px',
                                color: appConfig.theme.colors.primary["100"],
                            }}

                            value={message}
                            onChange={(event) => {
                                const textValue = event.target.value
                                setMessage(textValue)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    handleNewMessage(message)
                                }
                            }}
                        />
                        <Button
                            type='button'
                            label='Enviar'
                            size='lg'
                            variant='secondary'
                            colorVariant='neutral'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary["500"],
                                mainColorLight: appConfig.theme.colors.primary["400"],
                                mainColorStrong: appConfig.theme.colors.primary["600"],
                            }}

                            onClick={(event) => {
                                event.preventDefault()
                                handleNewMessage(message)
                            }}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    CHAT REACT
                </Text>

                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary["500"],
                        mainColorLight: appConfig.theme.colors.primary["400"],
                        mainColorStrong: appConfig.theme.colors.primary["600"],
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.message.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals["200"],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.primary["700"],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {message.textMessage}
                    </Text>
                )
            })}

        </Box>
    )
}