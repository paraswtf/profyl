import { useForm, yupResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import URLCard, { StoredURL } from '../components/URLCard';
import { object, string } from 'yup';
import { URLRegex } from '../../lib/utils/common';
import request from '../../lib/api';
import Confetti from 'react-dom-confetti';
import {
    Card,
    TextInput,
    Text,
    createStyles,
    Loader,
    ButtonProps,
    Button,
} from '@mantine/core';
import ButtonDark from '../components/ButtonDark';
import Color from 'color';
import Clipboard from 'react-clipboard.js';
import { showNotification } from '@mantine/notifications';
import { IconChecklist, IconX } from '@tabler/icons';

const CopyButton = (
    props: ButtonProps & {
        value: string;
        setConfetti: (v: boolean) => void;
        resetGeneratedState: () => void;
    }
) => {
    const [copied, setCopied] = useState(false);
    return (
        <>
            <Clipboard
                data-clipboard-text={props.value}
                onSuccess={() => {
                    setCopied(true);
                    props.setConfetti(true);
                    showNotification({
                        key: 'copied',
                        title: 'Copied!',
                        message: 'The URL has been copied to your clipboard',
                        color: 'teal',
                        icon: <IconChecklist size={18} />,
                        autoClose: 2000,
                    });
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
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
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
                    <Text>{copied ? 'Copied!' : 'Copy generated URL'}</Text>
                </Button>
            </Clipboard>
            <IconX
                color="white"
                style={{
                    padding: 8,
                    cursor: 'pointer',
                    boxSizing: 'content-box',
                    backgroundColor: 'teal',
                }}
                onClick={props.resetGeneratedState}
            />
        </>
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
        transition: 'width ease-in-out 300ms, background ease-in-out 100ms',
        background: 'rgba(40,84,125,0.25)',
        width: 188,
        borderRadius: 0,
        paddingInline: 12,
        ':active, :focus': {
            background: 'rgba(40,84,125,0.22)',
        },
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
            backgroundColor: Color('#335B7F').lighten(0.05).hex(),
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
    url: string().matches(URLRegex, 'invalid URL'),
});

interface Props {}

function TrySection(props: Props) {
    const { classes } = useStyles();
    const {} = props;
    const form = useForm({
        initialValues: {
            url: '',
        },
        validate: yupResolver(formSchema),
        validateInputOnChange: false,
        validateInputOnBlur: true,
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [confetti, setConfetti] = useState(false);

    //Handle urls stored in local storage
    const [urls, setUrls] = useState<StoredURL[]>([]);
    useEffect(() => {
        setUrls(JSON.parse(localStorage.getItem('urls') ?? '[]'));
    }, []);

    //Show copy button state
    const [showCopy, setShowCopy] = useState(false);

    //Submit the form
    async function handleSubmit(values: (typeof form)['values']) {
        if (!values.url) return form.setFieldError('url', 'url is required');
        //Else submit to api
        setSubmitted(true);
        setLoading(true);
        try {
            const res = await request('/urls/generate', {
                //If the url does not include the protocol, add it
                url: values.url.includes('://')
                    ? values.url
                    : 'https://' + values.url,
            });
            if (res.status === 200) {
                setShowCopy(true); //process.env.NEXT_PUBLIC_VERCEL_URL + '/' + res.slug
                let urls: StoredURL[] = JSON.parse(
                    localStorage.getItem('urls') ?? '[]'
                );
                urls = [
                    {
                        baseUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
                        slug: res.slug,
                        longUrl: res.longUrl,
                        updateKey: res.updateKey,
                    },
                    ...urls,
                ];
                setUrls(urls);
                localStorage.setItem('urls', JSON.stringify(urls));
            }
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
        <>
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
                            (submitted || showCopy ? ' submitted' : ''),
                        wrapper:
                            classes.wrapper + (form.errors.url ? ' error' : ''),
                        rightSection:
                            classes.rightSection +
                            (form.errors.url ? ' error' : '') +
                            (submitted || showCopy ? ' submitted' : ''),
                    }}
                    rightSection={
                        showCopy ? (
                            <CopyButton
                                value={
                                    urls[0]['baseUrl'] + '/' + urls[0]['slug']
                                }
                                setConfetti={setConfetti}
                                resetGeneratedState={() => {
                                    form.reset();
                                    setShowCopy(false);
                                }}
                            />
                        ) : (
                            <ButtonDark
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
                            </ButtonDark>
                        )
                    }
                    placeholder="Enter a long URL..."
                    inputMode="url"
                    w="288px"
                    {...form.getInputProps('url')}
                />
            </form>
            <Card className={classes.card}>
                <Text size={15} weight={700} align="center">
                    Previously generated URLs
                </Text>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    {urls.map((url, i) => (
                        <URLCard key={i} data={url} />
                    ))}
                </div>
            </Card>
        </>
    );
}

export default TrySection;
