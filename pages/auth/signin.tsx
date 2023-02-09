import {
    Center,
    Card,
    Text,
    Space,
    TextInput,
    Button,
    Divider,
    createStyles,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { IconMailFast, IconBrandGoogle, IconBrandDiscord } from '@tabler/icons'
import { useState } from 'react'
import Head from 'next/head'
import Logo from '../../components/Logo'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { object, string } from 'yup'
import { getServerSession } from 'next-auth'
const icons = {
    google: <IconBrandGoogle size={20} strokeWidth={4} />,
    discord: <IconBrandDiscord size={20} />,
}

const formSchema = object({
    username: string().email('invalid email').required('email is required'),
})

interface Props {
    providers: { name: string; id: string }[]
}

const useStyles = createStyles({
    page: {
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
    },
    providers: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
})

function SignIn({ providers }: Props) {
    //States for verification input
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
            username: '',
        },
        validate: yupResolver(formSchema),
        validateInputOnChange: false,
        validateInputOnBlur: false,
    })

    const handleSubmit = async (values: (typeof form)['values']) => {
        //Set loading state
        setLoading(true)
        await signIn('email', {
            email: values.username,
            callbackUrl: 'http://localhost:3001/ask',
        })
    }

    const { classes } = useStyles()

    return (
        <div>
            <Head>
                <title>Profyl - Login</title>
            </Head>
            <Center className={classes.page}>
                <Logo />
                <Space h="xl" />
                <Card
                    shadow="md"
                    p="md"
                    radius="lg"
                    bg="secondary"
                    w="min(350px, calc(100vw - 30px))"
                    sx={{ overflow: 'visible' }}
                >
                    <>
                        <Text size={24} weight="bold" align="center">
                            Login
                        </Text>
                        <Space h="sm" />
                        <div className={classes.providers}>
                            {providers.map((provider) => (
                                <Button
                                    radius="md"
                                    w="100%"
                                    type="submit"
                                    loading={loading}
                                    loaderProps={{
                                        size: 'xs',
                                        variant: 'dots',
                                    }}
                                    loaderPosition="right"
                                    disabled={loading}
                                    onClick={() => signIn(provider.id)}
                                    variant="default"
                                    //@ts-expect-error
                                    leftIcon={icons[provider.id] ?? null}
                                    h="50px"
                                >
                                    Sign in with {provider.name}
                                </Button>
                            ))}
                        </div>
                        {providers.length ? (
                            <Divider
                                my="sm"
                                label="or"
                                labelPosition="center"
                            />
                        ) : null}
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                placeholder="Enter your email"
                                autoComplete="username"
                                icon={<IconMailFast />}
                                withAsterisk={true}
                                {...form.getInputProps('username')}
                                disabled={loading}
                            />
                            <Space h="md" />
                            <Center>
                                <Button
                                    radius="md"
                                    w="100%"
                                    loading={loading}
                                    loaderProps={{
                                        size: 'xs',
                                        variant: 'dots',
                                    }}
                                    loaderPosition="right"
                                    disabled={loading}
                                    type="submit"
                                >
                                    Send me a magic link
                                </Button>
                            </Center>
                        </form>
                    </>
                </Card>
            </Center>
        </div>
    )
}

export async function getServerSideProps({ req, query }: any) {
    const session = await getSession({ req })
    if (session)
        return {
            redirect: {
                destination: query.callbackUrl ?? '/',
                permanent: false,
            },
        }

    const providers = await getProviders()
    return {
        props: {
            providers: providers
                ? Object.values(providers).filter(
                      (provider) => provider.id != 'email'
                  )
                : [],
        },
    }
}

export default SignIn
