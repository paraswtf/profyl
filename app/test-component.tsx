'use client';
import type { NextPage } from 'next';
import {
    Button,
    Center,
    Text,
    createStyles,
    TextInput,
    Loader,
    ButtonProps,
    Card,
    Space,
} from '@mantine/core';
import { useState } from 'react';
import HeroImage from './components/HeroImage';
import { useForm, yupResolver } from '@mantine/form';
import { object, string } from 'yup';
import request from '../lib/api';
import Clipboard from 'react-clipboard.js';
import Confetti from 'react-dom-confetti';
import ButtonLight from './components/ButtonLight';
import ButtonDark from './components/ButtonDark';
import { signIn } from 'next-auth/react';
import Transparency from './components/Transparency';
import Api from './components/Api';
import Data from './components/Data';

const CopyButton = (
    props: ButtonProps & { value: string; setConfetti: (v: boolean) => void }
) => {
    const [copied, setCopied] = useState(false);
    return (
        <Clipboard
            data-clipboard-text={props.value}
            onSuccess={() => {
                setCopied(true);
                props.setConfetti(true);
                setTimeout(() => {
                    setCopied(false);
                    props.setConfetti(false);
                }, 1000);
            }}
            isVisibleWhenUnsupported
            style={{
                padding: 0,
                margin: 0,
                width: '100%',
                background: 'none',
                border: 'none',
            }}
        >
            <Button
                component="div"
                color="teal"
                w="100%"
                //This makes the button overflow the input field vertically and not give weird 1px line whenever we click coz it moves down
                h="50px"
                radius={0}
            >
                {copied ? 'Copied!' : 'Copy generated URL'}
            </Button>
        </Clipboard>
    );
};

const useStyles = createStyles((theme) => ({
    wrapper: {
        outline: '2px #4084C5 solid',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        '&.error': {
            outline: '2px #ff3050 solid',
        },
        overflow: 'hidden',
    },
    input: {
        transition: 'width ease-in-out 300ms',
        background: 'rgba(40,84,125,0.25)',
        '&.error': {
            background: 'rgba(230,84,125,0.15)',
        },
        '&.submitted': {
            width: 0,
            padding: 0,
        },
        border: '0px',
        backdropFilter: 'blur(1px)',
        '::placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
        '::-ms-input-placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
        '::-moz-placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
        '::-webkit-input-placeholder': {
            color: theme.colorScheme === 'dark' ? '#FFFFFF52' : '#16487796',
            fontWeight: 400,
        },
    },
    rightSection: {
        width: '100px',
        transition: 'width ease-in-out 300ms',
        //Using box shadown, coz border is inside background, and I need it slightly transparent on error
        boxShadow: '-2px 0 0 #4084C5',
        //borderLeft: '2px #4084C5 solid',
        borderRadius: '0px 4px 4px 0px',
        backgroundColor: '#335B7F',
        '&.error': {
            boxShadow: '-2px 0 0 #ff3050',
        },
        '&.submitted': {
            width: '100%',
        },
    },
    try_button: {
        width: '100%',
        borderRadius: '0px',
        backgroundColor: '#335B7F',
        ':hover': {
            backgroundColor: '#335B7F',
        },
        '&.error': {
            backgroundColor: '#EE5757',
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 288,
        padding: 15,
        gap: 10,
        backgroundColor: '#1C315E',
        color: '#FFFFFF',
    },
    button: {
        width: '100%',
        borderRadius: '3px',
        backgroundColor: '#335B7F',
        ':hover': {
            backgroundColor: '#335B7F',
        },
        '&.error': {
            backgroundColor: '#f03030',
        },
    },
}));

const formSchema = object({
    url: string().url('invalid URL'),
});

const Home: NextPage = () => {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            url: '',
        },
        validate: yupResolver(formSchema),
        validateInputOnChange: true,
        validateInputOnBlur: true,
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [url, setUrl] = useState('');
    async function handleSubmit(values: (typeof form)['values']) {
        if (!values.url) return form.setFieldError('url', 'url is required');
        //Else submit to api
        setSubmitted(true);
        setLoading(true);
        try {
            const res = await request('/urls/generate', {
                url: values.url,
            });
            if (res.status === 200)
                setUrl(process.env.NEXT_PUBLIC_VERCEL_URL + '/' + res.slug);
            if (res.status === 400) {
                form.setFieldError('url', res.fields.url ?? 'an error occured');
            }
        } catch (e) {
            console.error(e);
            form.setFieldError('url', 'an error occured');
        }
        setLoading(false);
        setSubmitted(false);
    }

    return (
        <div
            style={{
                width: '100%',
                paddingTop: '180px',
                paddingBottom: '100px',
                backgroundImage:
                    'radial-gradient(#88A47C41 1px, transparent 1px), radial-gradient(#88A47C41 1px, transparent 1px)',
                backgroundSize: 'calc(20 * 1px) calc(20 * 1px)',
                backgroundPosition: '0 0, calc(10 * 1px) calc(10 * 1px)',
            }}
        >
            <Center
                w="100%"
                h="100%"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                <HeroImage />
                <Text size={20} variant="text" fw="bold">
                    Shorten your URLs with ease
                </Text>
                <Confetti
                    active={confetti}
                    config={{ elementCount: 200, spread: 90 }}
                />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        classNames={{
                            input:
                                classes.input +
                                (form.errors.url ? ' error' : '') +
                                (submitted || url ? ' submitted' : ''),
                            wrapper:
                                classes.wrapper +
                                (form.errors.url ? ' error' : ''),
                            rightSection:
                                classes.rightSection +
                                (form.errors.url ? ' error' : '') +
                                (submitted || url ? ' submitted' : ''),
                        }}
                        rightSection={
                            url ? (
                                <CopyButton
                                    value={url}
                                    setConfetti={setConfetti}
                                />
                            ) : (
                                <Button
                                    type="submit"
                                    className={
                                        classes.try_button +
                                        (form.errors.url ? ' error' : '')
                                    }
                                    //This makes the button overflow the input field vertically and not give weird 1px line whenever we click coz it moves down
                                    h="50px"
                                >
                                    {loading ? (
                                        <Loader variant="dots" color="white" />
                                    ) : (
                                        'Try it out'
                                    )}
                                </Button>
                            )
                        }
                        placeholder="Enter a long URL..."
                        inputMode="url"
                        w="288px"
                        {...form.getInputProps('url')}
                    />
                </form>
                <Card className={classes.card}>
                    <Text size={20} weight={700}>
                        Want to get more out of Profyl?
                    </Text>
                    <Text size={15} weight={500}>
                        Sign up to get access to the beta features like,
                        customisable URLs, link-in-bio, and more...
                    </Text>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                        }}
                    >
                        <ButtonDark onClick={signIn}>Sign up</ButtonDark>
                        <ButtonLight onClick={signIn}>Log in</ButtonLight>
                    </div>
                </Card>
                <Space h="xl" />
                <Text size={20} variant="text" fw="bold">
                    Why Profyl?{' '}
                </Text>
                <Transparency className="transparency-svg" />
                <Text size={15} variant="text" fw="bold">
                    Complete transparency
                </Text>
                <Text size={15} variant="text" w="281px">
                    Since profyl is open source, you always know how your data
                    is being processed.
                </Text>
                <Space h="sm" />
                <Api className="api" />
                <Text size={15} variant="text" fw="bold">
                    A simple and robust API
                </Text>
                <Text size={15} variant="text" w="281px">
                    All you need is your API key to generate shortened URLs
                    right from your own app.
                </Text>
                <Space h="sm" />
                <Data className="data" />
                <Text size={15} variant="text" fw="bold">
                    Data at your fingertips
                </Text>
                <Text size={15} variant="text" w="281px">
                    Get access to valuable insights like link clicks and refs
                    right from your dashboard.
                </Text>
            </Center>
        </div>
    );
};

export default Home;
